import { Address, AliasAction, MosaicId, NamespaceId } from 'symbol-sdk/dist/src/model';
import { AliasTransaction, Deadline, SignedTransaction } from 'symbol-sdk/dist/src/model/transaction';

import { InvalidValueError } from '@/models/ErrorModels';
import { NetworkType, NodeInfo } from '@/models/NetworkModels';
import { TransactionOption, TransactionService } from '@/services/Transactions/TransactionService';

export interface AliasOption extends TransactionOption {
  /** リンクする対象 */
  linkTargetType: 'address' | 'mosaic';
  /** 連携・解除フラグ */
  linkActionType: 'link' | 'unlink';
  /** namespace id */
  namespaceId: string;
  /** リンクする対象のアドレス */
  targetAddress?: string;
  /** リンクする対象のモザイク */
  targetMosaicId?: string;
}

export class AliasService extends TransactionService {
  private transaction: AliasTransaction;

  /** TransferTransaction を作成する */
  public constructor(networkType: NetworkType, options: AliasOption) {
    super(networkType);

    if (options.linkTargetType === 'address') {
      if (!options.targetAddress) {
        throw new InvalidValueError('targetAddress is required');
      }
      this.transaction = AliasTransaction.createForAddress(
        Deadline.create(this.networkPropeties.epochAdjustment, options.deadlineHour || 2),
        options.linkActionType === 'link' ? AliasAction.Link : AliasAction.Unlink,
        NamespaceId.createFromEncoded(options.namespaceId),
        Address.createFromRawAddress(options.targetAddress),
        this.hexNetworkType
      ).setMaxFee(100);
    } else if (options.linkTargetType === 'mosaic') {
      if (!options.targetMosaicId) {
        throw new InvalidValueError('targetMosaicId is required');
      }
      this.transaction = AliasTransaction.createForMosaic(
        Deadline.create(this.networkPropeties.epochAdjustment, options.deadlineHour || 2),
        options.linkActionType === 'link' ? AliasAction.Link : AliasAction.Unlink,
        NamespaceId.createFromEncoded(options.namespaceId),
        new MosaicId(options.targetMosaicId),
        this.hexNetworkType
      ).setMaxFee(100);
    } else {
      throw new InvalidValueError(`linkTargetType is invalid: ${options.linkTargetType}`);
    }
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
