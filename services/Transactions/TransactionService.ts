import { ConnectionError, InvalidValueError } from '@/models/ErrorModels';
import { NetworkProperty, NodeInfo } from '@/models/NetworkModels';

import { NETWORK_PROPERTIES } from '@/util/configs/network-properties';

import { PrivateKey, Signature } from 'symbol-sdk';
import { KeyPair, models, SymbolFacade, Network } from 'symbol-sdk/symbol';
import { AddressService } from '@/services/AddressService';

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
  public async announceTransaction(
    node: NodeInfo,
    transaction: models.Transaction,
    signature: Signature
  ): Promise<Error | any> {
    const facade = new SymbolFacade(this.network);
    const txHash = facade.hashTransaction(transaction).toString();
    const payload = facade.transactionFactory.static.attachSignature(transaction, signature);

    // TODO 検証用にfetchで行う
    return await new Promise(async (resolve, reject) => {
      try {
        const sendRes = await fetch(`${node.restGatewayUrl}/transactions`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: payload,
        }).then((res) => res.json());
        console.log(sendRes);
        try {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          const statusRes = await fetch(`${node.restGatewayUrl}/transactionStatus/${txHash}`).then((res) => res.json());
          console.log(statusRes);
          resolve(sendRes);
        } catch (e) {
          console.error(e);
          reject(new InvalidValueError(sendRes?.data?.code));
        }
      } catch (e) {
        console.error(e);
        reject(new ConnectionError('Failed to announce transaction'));
      }
    });

    // TODO Websocketによるアナウンス方法が良く分からなったのでfetchで検証した
    // return await new Promise(function (resolve, reject) {
    //   const ws = new WebSocket(node.websocketUrl);

    //   ws.onopen = () => {
    //     // アナウンスは WebSocket を開いた後でなければならない
    //     // FIXME ここが良くわからない。。。
    //     // transactionRoutesApi.announceTransaction({ transactionPayload: { payload } }).catch(() => {
    //     //   ws.close();
    //     //   reject(new ConnectionError('Failed to announce transaction'));
    //     // });
    //   };

    //   ws.onclose = () => {};
    //   ws.onmessage = (message: any) => {
    //     // 新規 Confirmed Transaction を監視
    //     const res = JSON.parse(message.data);
    //     const statusFlag: string = `status/${observedAddress}`;
    //     const confirmedFlag: string = `confirmedAdded/${observedAddress}`;
    //     if ('uid' in res) {
    //       const body1: { [key: string]: string } = { uid: res.uid, subscribe: statusFlag };
    //       const body2: { [key: string]: string } = { uid: res.uid, subscribe: confirmedFlag };
    //       ws.send(JSON.stringify(body1));
    //       ws.send(JSON.stringify(body2));
    //     } else {
    //       if (res.topic === statusFlag) {
    //         // 受け入れられなかった時
    //         if (res.data.hash === txHash) {
    //           ws.close();
    //           reject(new InvalidValueError(res.data.code));
    //         }
    //       } else if (res.topic === confirmedFlag) {
    //         // 成功時
    //         if (res.data.meta.hash === txHash) {
    //           ws.close();
    //           resolve(res);
    //         }
    //       }
    //     }
    //   };
    // });
  }
}
