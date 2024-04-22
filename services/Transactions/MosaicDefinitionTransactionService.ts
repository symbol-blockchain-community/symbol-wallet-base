import { UInt64 } from 'symbol-sdk';
import { PublicAccount } from 'symbol-sdk/dist/src/model/account';
import { MosaicFlags, MosaicId, MosaicNonce, MosaicSupplyChangeAction } from 'symbol-sdk/dist/src/model/mosaic';
import {
  AggregateTransaction,
  Deadline,
  MosaicDefinitionTransaction,
  MosaicSupplyChangeTransaction,
  SignedTransaction,
} from 'symbol-sdk/dist/src/model/transaction';

import { NetworkType, NodeInfo } from '@/models/NetworkModels.js';
import { TransactionOption, TransactionService } from '@/services/Transactions/TransactionService';

export interface MosaicDefinitionOption extends TransactionOption {
  /** 発行者の公開鍵 */
  ownerPublickey: string;
  /** 可分性 */
  divisibility: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  /** 発行枚数（注: divisibility によって指定するべき値は可変） */
  numberOfIssued: number;
  /** 有効期限 */
  duration: number;
  /** 供給量変更の可否 */
  supplyMutable: boolean;
  /** 第三者への譲渡可否 */
  transferable: boolean;
  /** 制限設定の可否 */
  restrictable: boolean;
  /** 発行者からの還収可否 */
  revokable: boolean;
}

export class MosaicDefinitionService extends TransactionService {
  private transaction: AggregateTransaction;

  /** MosaicDefinition を作成する */
  private constructor(networkType: NetworkType, options: MosaicDefinitionOption) {
    super(networkType);
    const nonce = MosaicNonce.createRandom();
    const publicAccount = PublicAccount.createFromPublicKey(options.ownerPublickey, this.hexNetworkType);

    const defineTx = MosaicDefinitionTransaction.create(
      undefined,
      nonce,
      MosaicId.createFromNonce(nonce, publicAccount.address),
      MosaicFlags.create(options.supplyMutable, options.transferable, options.restrictable, options.revokable),
      options.divisibility,
      UInt64.fromUint(options.duration),
      this.hexNetworkType
    ).setMaxFee(options.maxFee || 100) as MosaicDefinitionTransaction;

    const supplyChainTx = MosaicSupplyChangeTransaction.create(
      undefined,
      defineTx.mosaicId,
      MosaicSupplyChangeAction.Increase,
      UInt64.fromUint(options.numberOfIssued),
      this.hexNetworkType
    );

    this.transaction = AggregateTransaction.createComplete(
      Deadline.create(this.networkPropeties.epochAdjustment, options.deadlineHour || 2),
      [defineTx.toAggregate(publicAccount), supplyChainTx.toAggregate(publicAccount)],
      this.hexNetworkType,
      []
    );
  }

  /** @overload 署名する */
  public signTransaction(privateKey: string): SignedTransaction {
    return super.signTransaction(privateKey, this.transaction);
  }

  /** @overload トランザクションを同期的にアナウンスする */
  public async announceTransaction(node: NodeInfo, signedTx: SignedTransaction): Promise<any> {
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
