import { Account } from 'symbol-sdk/dist/src/model/account';
import { NetworkType as HexNetworkType, TransactionFees } from 'symbol-sdk/dist/src/model/network';
import { SignedTransaction, Transaction } from 'symbol-sdk/dist/src/model/transaction';

import { ConnectionError, InvalidValueError } from '@/models/ErrorModels';
import { NetworkProperty, NetworkType, NodeInfo } from '@/models/NetworkModels';
import { TransactionFeeRate } from '@/models/TransactionModel';
import { Configuration, TransactionRoutesApi } from '@/services/NodeClientService';
import { NETWORK_PROPERTIES } from '@/util/configs/network-properties';
import { strNetworkTypeToHexadecimal } from '@/util/symbol/network';

export interface TransactionOption {
  /** デッドラインを Hour で指定。デフォルト = 2 */
  deadlineHour?: number;
  /** 最大手数料。事前に計算する場合 .calcFee にて計算する */
  maxFee?: number;
}

export class TransactionService {
  protected networkPropeties: NetworkProperty;
  protected hexNetworkType: HexNetworkType;

  protected constructor(networkType: NetworkType) {
    this.networkPropeties = NETWORK_PROPERTIES[networkType];
    this.hexNetworkType = strNetworkTypeToHexadecimal(networkType);
  }

  /**
   * MaxFee を試算する。
   * 乗数は Symbol Desktop Wallet の計算式と統一する https://github.com/symbol/desktop-wallet/blob/00213e53ebed157d091d70fc9ba01aba1822eb9a/src/components/MaxFeeAndSubmit/MaxFeeAndSubmit.vue#L116
   */
  protected static calcTransactionFee(rate: TransactionFeeRate, fee: TransactionFees, size: number): number {
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
   */
  public signTransaction(privateKey: string, transaction: Transaction): SignedTransaction {
    const account = Account.createFromPrivateKey(privateKey, this.hexNetworkType);
    return account.sign(transaction, this.networkPropeties.generationHashSeed);
  }

  /**
   * トランザクションを同期的にアナウンスする
   * symbol-sdk v2 の TransactionService 相当の動作をする
   */
  public async announceTransaction(node: NodeInfo, transaction: SignedTransaction): Promise<Error | any> {
    const observedAddress: string = transaction.getSignerAddress().plain();
    const config = new Configuration({ basePath: node.restGatewayUrl });
    const transactionRoutesApi = new TransactionRoutesApi(config);

    return await new Promise(function (resolve, reject) {
      const ws = new WebSocket(node.websocketUrl);

      ws.onopen = () => {
        // アナウンスは WebSocket を開いた後でなければならない
        transactionRoutesApi.announceTransaction({ transactionPayload: { payload: transaction.payload } }).catch(() => {
          ws.close();
          reject(new ConnectionError('Failed to announce transaction'));
        });
      };

      ws.onclose = () => {};
      ws.onmessage = (message: any) => {
        // 新規 Confirmed Transaction を監視
        const res = JSON.parse(message.data);
        const statusFlag: string = `status/${observedAddress}`;
        const confirmedFlag: string = `confirmedAdded/${observedAddress}`;
        if ('uid' in res) {
          const body1: { [key: string]: string } = { uid: res.uid, subscribe: statusFlag };
          const body2: { [key: string]: string } = { uid: res.uid, subscribe: confirmedFlag };
          ws.send(JSON.stringify(body1));
          ws.send(JSON.stringify(body2));
        } else {
          if (res.topic === statusFlag) {
            // 受け入れられなかった時
            if (res.data.hash === transaction.hash) {
              ws.close();
              reject(new InvalidValueError(res.data.code));
            }
          } else if (res.topic === confirmedFlag) {
            // 成功時
            if (res.data.meta.hash === transaction.hash) {
              ws.close();
              resolve(res);
            }
          }
        }
      };
    });
  }
}
