// import { NamespaceRegistrationTransaction, SignedTransaction } from 'symbol-sdk/dist/src/model/transaction';

import { NetworkType, NodeInfo } from '@/models/NetworkModels';
import { TransactionOption, TransactionService } from '@/services/Transactions/TransactionService';

export interface DeligationOption extends TransactionOption {}

/**
 * TODO: ワンタップ委任のやり方が分かり次第追加
 */
export class DeligationTransactionService extends TransactionService {
  // FIXME private transaction: NamespaceRegistrationTransaction;
  private transaction: any;

  /** TransferTransaction を作成する */
  public constructor(networkType: NetworkType, options: DeligationOption) {
    super(networkType);
    // this.transaction =
  }

  /** @overload 署名する */
  // FIXME public signTransaction(privateKey: string): SignedTransaction {
  public signTransaction(privateKey: string): any {
    return super.signTransaction(privateKey, this.transaction);
  }

  /** @overload トランザクションを同期的にアナウンスする */
  // FIXME public async announceTransaction(node: NodeInfo, signedTx: SignedTransaction): Promise<any> {
  public async announceTransaction(node: NodeInfo, signedTx: any): Promise<any> {
    try {
      const res = await super.announceTransaction(node, signedTx);
      if (res instanceof Error) {
        throw res;
      }
      return res;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  /** 現在のトランザクションを取得する */
  public get data() {
    return this.transaction;
  }
}
