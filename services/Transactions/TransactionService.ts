import { PrivateKey, Signature } from 'symbol-sdk';
import { KeyPair, models, SymbolFacade, Network } from 'symbol-sdk/symbol';

import { ConnectionError, InvalidValueError } from '@/models/ErrorModels';
import { NetworkProperty, NodeInfo } from '@/models/NetworkModels';
import { AddressService } from '@/services/AddressService';
import { Configuration, TransactionRoutesApi } from '@/services/NodeClientService';
import { NETWORK_PROPERTIES } from '@/util/configs/network-properties';

export interface ITransactionFees {
  averageFeeMultiplier: number;
  medianFeeMultiplier: number;
  highestFeeMultiplier: number;
  lowestFeeMultiplier: number;
  minFeeMultiplier: number;
}

export type TTransactionFeeRate = 'zero' | 'slow' | 'normal' | 'fast';

export interface TransactionOption {
  /** デッドラインを Hour で指定。デフォルト = 2 */
  deadlineHour?: number;
  /** 最大手数料。事前に計算する場合 .calcFee にて計算する */
  maxFee?: number;
}

export class TransactionService {
  protected networkPropeties: NetworkProperty;
  protected network: Network;

  protected constructor(network: Network) {
    this.networkPropeties = NETWORK_PROPERTIES[network.name as 'testnet' | 'mainnet'];
    this.network = network;
  }

  /**
   * MaxFee を試算する。
   * 乗数は Symbol Desktop Wallet の計算式と統一する https://github.com/symbol/desktop-wallet/blob/00213e53ebed157d091d70fc9ba01aba1822eb9a/src/components/MaxFeeAndSubmit/MaxFeeAndSubmit.vue#L116
   */
  protected static calcTransactionFee(rate: TTransactionFeeRate, fee: ITransactionFees, size: number): number {
    if (rate === 'zero') {
      return 0;
    } else if (rate === 'slow') {
      return (fee.minFeeMultiplier + fee.averageFeeMultiplier * 0.35) * size;
    } else if (rate === 'fast') {
      return fee.averageFeeMultiplier * size;
    } else if (rate === 'normal') {
      return (fee.minFeeMultiplier + fee.averageFeeMultiplier * 0.65) * size;
    } else {
      throw new InvalidValueError(`rate ${rate} is not defined`);
    }
  }

  /**
   * トランザクションへ署名する
   * @returns {string} Payload
   */
  public signTransaction(privateKey: string | PrivateKey, transaction: models.Transaction): Signature {
    const keyPair = new KeyPair(typeof privateKey === 'string' ? new PrivateKey(privateKey) : privateKey);
    const facade = new SymbolFacade(this.network);
    return facade.signTransaction(keyPair, transaction);
  }

  /**
   * トランザクションを同期的にアナウンスする
   */
  public async announce(node: NodeInfo, transaction: models.Transaction, signature: Signature): Promise<Error | any> {
    const observedAddress = AddressService.createFromPublicKey(
      transaction.signerPublicKey.toString(),
      this.network
    ).plain();

    const config = new Configuration({ basePath: node.restGatewayUrl });
    const transactionRoutesApi = new TransactionRoutesApi(config);

    const facade = new SymbolFacade(this.network);
    const payload: string = facade.transactionFactory.static.attachSignature(transaction, signature);
    const txHash = facade.hashTransaction(transaction).toString();

    return await new Promise(function (resolve, reject) {
      const ws = new WebSocket(node.websocketUrl);
      setInterval(() => {
        console.log('WebSocket readyState:', ws.readyState);
      }, 1000);
      ws.onopen = () => {
        ws.ping();
        // アナウンスは WebSocket を開いた後でなければならない
        transactionRoutesApi
          .announceTransaction({
            transactionPayload: JSON.parse(payload),
          })
          .then((resp) => {
            console.log(resp);
          })
          .catch((error) => {
            console.error(error);
            ws.close();
            reject(new ConnectionError('Failed to announce transaction'));
          });
      };

      ws.onclose = () => {};
      ws.onerror = (error) => {
        reject(new ConnectionError(`Websocket error occurred. ${error}`));
      };

      ws.onmessage = (message: any) => {
        // 新規 Confirmed Transaction を監視
        const res = JSON.parse(message.data);
        const statusFlag: string = `status/${observedAddress}`;
        const confirmedFlag: string = `confirmedAdded/${observedAddress}`;
        if ('uid' in res) {
          const body1: { [key: string]: string } = {
            uid: res.uid,
            subscribe: statusFlag,
          };
          const body2: { [key: string]: string } = {
            uid: res.uid,
            subscribe: confirmedFlag,
          };
          ws.send(JSON.stringify(body1));
          ws.send(JSON.stringify(body2));
        } else {
          if (res.topic === statusFlag) {
            // 受け入れられなかった時
            if (res.data.hash === txHash) {
              ws.close();
              reject(new InvalidValueError(res.data.code));
            }
          } else if (res.topic === confirmedFlag) {
            // 成功時
            if (res.data.meta.hash === txHash) {
              ws.close();
              resolve(res);
            }
          }
        }
      };
    });
  }
}
