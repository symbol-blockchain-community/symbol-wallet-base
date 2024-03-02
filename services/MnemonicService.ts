/*

  ニーモニックの発行や SecureStorage への書き込み、削除機能を提供します。

*/

import { MnemonicPassPhrase, ExtendedKey, Wallet, Network } from 'symbol-hd-wallets';

import { MnemonicModel } from '@/models/AccountModel';
import { InvalidValueError, StorageError } from '@/models/ErrorModels';
import { STORAGE_KEYS } from '@/util/configs/storage-keys';
import { SecureStorage } from '@/util/storages/SecureStorage';

export class MnemonicService extends SecureStorage {
  /**
   * @param mnemonic format: "text text text"
   * @param seed hex string
   */
  private constructor(
    public mnemonic: string,
    public seed: string
  ) {
    super(STORAGE_KEYS.secure.MNEMONIC);
  }

  /** ランダムな mnemonic を作成して MnemonicService インスタンスを返却する */
  public static createRandom(): MnemonicService {
    const mnemonic = MnemonicPassPhrase.createRandom();
    const seed = mnemonic.toSeed().toString('hex');
    return new MnemonicService(mnemonic.plain, seed);
  }

  /** ローカルストレージに保存されたニーモニックを返却する */
  public static async getFromStorage() {
    const storage = new SecureStorage(STORAGE_KEYS.secure.MNEMONIC);
    const item: MnemonicModel | null = JSON.parse(await storage.getSecretItem());
    if (!item) {
      throw new StorageError('Failed to read from storage.');
    }
    return item;
  }

  /** ニーモニックフレーズより MnemonicService インスタンスを返却する */
  public static generateFromPhrase(mnemonicPhrase: string): MnemonicService {
    const mnemonic = new MnemonicPassPhrase(mnemonicPhrase);
    if (!mnemonic.isValid()) {
      throw new InvalidValueError('Incorrect mnemonic format');
    }
    const seed = mnemonic.toSeed().toString('hex');
    return new MnemonicService(mnemonic.plain, seed);
  }

  /** 現在の MnemonicSerivde インスタンスの Mnemonic より、子PrivateKey を生成する */
  public getChildPrivateKey(height: number): string {
    const xkey = ExtendedKey.createFromSeed(this.seed, Network.SYMBOL);
    const wallet = new Wallet(xkey);
    return wallet.getChildAccountPrivateKey(`m/44'/4343'/0'/0'/${height}'`);
  }

  /** ニーモニックをストレージへ保存する。デバイスにつきニーモニックは1つとする */
  public async replaceToStorage(): Promise<void> {
    try {
      const item = JSON.stringify({ mnemonic: this.mnemonic } as MnemonicModel);
      await this.setSecretItem(item);
    } catch (err) {
      console.error(err);
    }
  }

  /** ニーモニックに紐づくアドレスを指定した height まで取得する */
  public getChildAddresses(start: number = 0, end: number = 30): string[] {
    const xkey = ExtendedKey.createFromSeed(this.seed, Network.SYMBOL);
    const wallet = new Wallet(xkey);
    const addresses: string[] = [];
    for (let i = start; i <= end; i++) {
      addresses.push(wallet.getChildAccountPrivateKey(`m/44'/4343'/0'/0'/${i}'`));
    }
    return addresses;
  }
}
