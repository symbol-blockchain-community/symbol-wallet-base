import { UInt64 } from 'symbol-sdk/dist/src/model';
import { Deadline, NamespaceRegistrationTransaction, SignedTransaction } from 'symbol-sdk/dist/src/model/transaction';

import { NetworkType, NodeInfo } from '@/models/NetworkModels';
import { Configuration, NetworkRoutesApi } from '@/services/NodeClientService';
import { TransactionOption, TransactionService } from '@/services/Transactions/TransactionService';
import { NETWORK_PROPERTIES } from '@/util/configs/network-properties';
import { toAbsoluteAmount } from '@/util/symbol/amount';
import { hexToStrNetworkType } from '@/util/symbol/network';

export interface NamespaceDefinitionOption extends TransactionOption {
  /** namespace name */
  namespaceName: string;
  /** 有効期限 */
  duration: number;
}

/**
 * Namespace を作成します。作成後のアドレスやMosaicの紐づけは AliasTransactionService を使用します。
 */
export class NamespaceDefinitionService extends TransactionService {
  private transaction: NamespaceRegistrationTransaction;

  /** TransferTransaction を作成する */
  public constructor(networkType: NetworkType, options: NamespaceDefinitionOption) {
    super(networkType);
    this.transaction = NamespaceRegistrationTransaction.createRootNamespace(
      Deadline.create(this.networkPropeties.epochAdjustment, options.deadlineHour || 2),
      options.namespaceName,
      UInt64.fromUint(options.duration),
      this.hexNetworkType
    );
  }

  /**
   * レンタル手数料を計算する
   */
  public static async calcFee(node: NodeInfo, rentalDays: number): Promise<number> {
    const config = new Configuration({ basePath: node.restGatewayUrl });
    const networkRoutesApi = new NetworkRoutesApi(config);
    const { effectiveRootNamespaceRentalFeePerBlock } = await networkRoutesApi.getRentalFees();
    const rentalBlocks: number = (rentalDays + 24 * 60 * 60) / 30;
    const rentalFeeTotal = rentalBlocks + Number(effectiveRootNamespaceRentalFeePerBlock);
    // 人間向けの値に変換する
    const divisibility = NETWORK_PROPERTIES[hexToStrNetworkType(node.networkIdentifier)].currencyDivisibility;
    return toAbsoluteAmount(rentalFeeTotal, divisibility);
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
