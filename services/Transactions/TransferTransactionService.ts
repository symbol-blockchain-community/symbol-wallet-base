// import { Account, Address } from 'symbol-sdk/dist/src/model/account';
// import { EmptyMessage, Message } from 'symbol-sdk/dist/src/model/message';
// import { Mosaic } from 'symbol-sdk/dist/src/model/mosaic';
// import { TransactionFees } from 'symbol-sdk/dist/src/model/network';
// import { Deadline, SignedTransaction, TransferTransaction } from 'symbol-sdk/dist/src/model/transaction';

// import { NetworkType, NodeInfo } from '@/models/NetworkModels';
// import { TransactionFeeRate } from '@/models/TransactionModel';
import {
  ITransactionFees,
  TTransactionFeeRate,
  TransactionOption,
  TransactionService,
} from '@/services/Transactions/TransactionService';
import { strNetworkTypeToHexadecimal } from '@/util/symbol/network';

import { PrivateKey, PublicKey, Signature } from 'symbol-sdk';
import {
  KeyPair,
  descriptors,
  models,
  SymbolFacade,
  Address,
  Network,
  SymbolPublicAccount,
  SymbolAccount,
} from 'symbol-sdk/symbol';
import { AddressService } from '@/services/AddressService';
import { NodeInfo } from '@/models/NetworkModels';

export interface TransferTransactionOption extends TransactionOption {
  /** 送信先Base32アドレス */
  recipientAddress: string | Address;
  /** 送信する Mosaic */
  mosaics: models.Mosaic[];
  /** トランザクションメッセージ */
  message?: string | Uint8Array;
}

export class TransferTransactionService extends TransactionService {
  private transaction: models.Transaction;
  private facade: SymbolFacade;

  /** TransferTransaction を作成する */
  public constructor(networkType: Network, fromAccount: SymbolAccount, options: TransferTransactionOption) {
    super(networkType);

    this.facade = new SymbolFacade(networkType);

    const transferTransactionDescriptor = TransferTransactionService.createTransferTransactionDescriptor(
      options.recipientAddress,
      options.mosaics,
      options.message
    );

    this.transaction = this.facade.createTransactionFromTypedDescriptor(
      transferTransactionDescriptor,
      fromAccount.publicKey,
      options.maxFee || 100,
      Number(this.facade.now().addHours(1).timestamp)
    );
  }

  /**
   * MaxFee を試算する。 fee は事前に http://node-domain/network/fees/transaction より取得する。
   */
  public static calcFee(rate: TTransactionFeeRate, fee: ITransactionFees, message?: string | Uint8Array): number {
    const dummyFacade = new SymbolFacade(Network.MAINNET);
    const dummyAccount = dummyFacade.createAccount(PrivateKey.random());

    const transferTransactionDescriptor = this.createTransferTransactionDescriptor(dummyAccount.address, [], message);

    const size = dummyFacade.createTransactionFromTypedDescriptor(
      transferTransactionDescriptor,
      dummyAccount.publicKey,
      0,
      0
    ).size;

    return this.calcTransactionFee(rate, fee, size);
  }

  /** @overload 署名する */
  public signTransaction(privateKey: string) {
    return super.signTransaction(privateKey, this.transaction);
  }

  /**
   * 請求向け。
   * QR コード向けの JSON に変換する。 QR コードへの表示は UI 側で別途ライブラリを使用する想定
   */
  public toQRJSON(): object {
    return {
      v: 3,
      type: this.transaction.type,
      network_id: this.transaction.network.value,
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

  /**
   * TransferTransactionDescriptor を作成する共通メソッド
   */
  private static createTransferTransactionDescriptor(
    recipientAddress: string | Address,
    mosaics: models.Mosaic[],
    message?: string | Uint8Array
  ): descriptors.TransferTransactionV1Descriptor {
    const address = typeof recipientAddress === 'string' ? new Address(recipientAddress) : recipientAddress;

    return new descriptors.TransferTransactionV1Descriptor(
      address,
      mosaics.map((m) => new descriptors.MosaicDescriptor(m.mosaicId, m.amount)),
      message ? TransferTransactionService.prependNullByte(message) : undefined
    );
  }

  /** メッセージの先頭バイトに\0を追加する */
  private static prependNullByte(input: string | Uint8Array): string | Uint8Array {
    if (typeof input === 'string') {
      // 先頭に\0がついていない場合、\0を追加
      return input.startsWith('\0') ? input : `\0${input}`;
    } else if (input instanceof Uint8Array) {
      // Uint8Arrayの場合、先頭に\0を追加
      if (input[0] !== 0) {
        const result = new Uint8Array(input.length + 1);
        result.set([0], 0); // 先頭に\0を追加
        result.set(input, 1); // 既存の内容を後ろにコピー
        return result;
      }
      return input;
    } else {
      throw new Error('Input must be a string or Uint8Array');
    }
  }
}
