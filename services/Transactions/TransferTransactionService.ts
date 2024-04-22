import { Account, Address } from 'symbol-sdk/dist/src/model/account';
import { EmptyMessage, Message } from 'symbol-sdk/dist/src/model/message';
import { Mosaic } from 'symbol-sdk/dist/src/model/mosaic';
import { TransactionFees } from 'symbol-sdk/dist/src/model/network';
import { Deadline, SignedTransaction, TransferTransaction } from 'symbol-sdk/dist/src/model/transaction';

import { NetworkType, NodeInfo } from '@/models/NetworkModels.js';
import { TransactionFeeRate } from '@/models/TransactionModel';
import { TransactionOption, TransactionService } from '@/services/Transactions/TransactionService';
import { strNetworkTypeToHexadecimal } from '@/util/symbol/network';

export interface TransferTransactionOption extends TransactionOption {
  /** 送信先Base32アドレス */
  recipientAddress: string;
  /** 送信する Mosaic */
  mosaics: Mosaic[];
  /** トランザクションメッセージ */
  message?: Message;
}

export class TransferTransactionService extends TransactionService {
  private transaction: TransferTransaction;

  /** TransferTransaction を作成する */
  public constructor(networkType: NetworkType, options: TransferTransactionOption) {
    super(networkType);
    this.transaction = TransferTransaction.create(
      Deadline.create(this.networkPropeties.epochAdjustment, options.deadlineHour || 2),
      Address.createFromRawAddress(options.recipientAddress),
      options.mosaics,
      options.message || EmptyMessage,
      this.hexNetworkType
    ).setMaxFee(options.maxFee || 100) as TransferTransaction;
  }

  /**
   * MaxFee を試算する。 fee は事前に http://node-domain/network/fees/transaction より取得する。
   */
  public static calcFee(rate: TransactionFeeRate, fee: TransactionFees, message?: Message): number {
    const dummyNetworkType = strNetworkTypeToHexadecimal('mainnet');
    const dummyAccount = Account.generateNewAccount(dummyNetworkType);
    // message 以外は計算式に影響しない
    const size: number = TransferTransaction.create(
      Deadline.create(0, 0),
      dummyAccount.address,
      [],
      message || EmptyMessage,
      dummyNetworkType
    ).size;
    return this.calcTransactionFee(rate, fee, size);
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

  /**
   * 請求向け。
   * QR コード向けの JSON に変換する。 QR コードへの表示は UI 側で別途ライブラリを使用する想定
   */
  public toQRJSON(): object {
    return {
      v: 3,
      type: this.transaction.type,
      network_id: this.transaction.networkType,
      chain_id: this.networkPropeties.generationHashSeed,
      data: {
        payload: this.transaction.serialize(),
      },
    };
  }

  /** 現在のトランザクションを取得する */
  public get data() {
    return this.transaction;
  }
}
