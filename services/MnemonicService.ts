/*

  ニーモニックの発行や SecureStorage への書き込み、削除機能を提供します。

*/

import { Bip32 } from 'symbol-sdk';
import { SymbolFacade } from 'symbol-sdk/symbol';

import { MnemonicModel } from '@/models/AccountModel';
import { InvalidValueError } from '@/models/ErrorModels';
import { NetworkType } from '@/models/NetworkModels';
import { STORAGE_KEYS } from '@/util/configs/storage-keys';
import { SecureStorage } from '@/util/storages/SecureStorage';

export class MnemonicService extends SecureStorage {
  private static curveName: string = SymbolFacade.BIP32_CURVE_NAME;
  private static mnemonicLanguage: string = 'english';

  /**
   * @param mnemonic format: "text text text"
   */
  private constructor(public mnemonic: string) {
    super(STORAGE_KEYS.secure.MNEMONIC);
  }

  /** ランダムな mnemonic を作成して MnemonicService インスタンスを返却する */
  public static createRandom(): MnemonicService {
    return new MnemonicService(new Bip32(this.curveName, this.mnemonicLanguage).random());
  }

  /** ローカルストレージに保存されたニーモニックを返却する */
  public static async getFromStorage(): Promise<MnemonicModel | null> {
    const storage = new SecureStorage(STORAGE_KEYS.secure.MNEMONIC);
    return JSON.parse((await storage.getSecretItem()) || 'null');
  }

  /** ニーモニックフレーズより MnemonicService インスタンスを返却する */
  public static generateFromPhrase(mnemonicPhrase: string): MnemonicService {
    // 全角を変革へ揃え、かつ半角英字とスペース以外の文字列が混入している場合はエラーを返却する
    mnemonicPhrase = mnemonicPhrase
      .replace(/[Ａ-Ｚａ-ｚ]/g, (s) => String.fromCharCode(s.charCodeAt(0) - 0xfee0))
      .replace(/\u3000/g, '\u0020')
      .trim();
    if (mnemonicPhrase.match(/[^A-Za-z\u0020]/)) {
      throw new InvalidValueError('Incorrect mnemonic format');
    }

    // mnemonic 長が正しいか確認
    if (new Bip32(this.curveName, this.mnemonicLanguage).fromMnemonic(mnemonicPhrase, '').chainCode.length !== 32) {
      throw new InvalidValueError('Incorrect mnemonic format');
    }

    return new MnemonicService(mnemonicPhrase);
  }

  /** 現在の MnemonicSerivde インスタンスの Mnemonic より、子PrivateKey を生成する */
  public getChildPrivateKey(height: number, networkType: NetworkType): string {
    if (height < 0) {
      throw new Error('Invalid height: height must be greater than zero');
    }
    const bip32Path: number[] = new SymbolFacade(networkType).bip32Path(height);
    return new Bip32(MnemonicService.curveName, MnemonicService.mnemonicLanguage)
      .fromMnemonic(this.mnemonic, '')
      .derivePath(bip32Path)
      .privateKey.toString();
  }

  /** ニーモニックをストレージへ保存する。デバイスにつきニーモニックは1つとする */
  public async replaceToStorage(): Promise<void> {
    const item = JSON.stringify({ mnemonic: this.mnemonic } as MnemonicModel);
    await this.setSecretItem(item);
  }

  /** ニーモニックに紐づく秘密鍵を指定した height まで取得する */
  public getChildPrivateKeies(start: number = 0, end: number = 30, networkType: NetworkType): string[] {
    if (start >= end) {
      throw new Error('Invalid range: start must be less than end');
    }
    if (start < 0 || end < 0) {
      throw new Error('Invalid range: start and end must be positive integers');
    }
    const facade: SymbolFacade = new SymbolFacade(networkType);
    const privateKeys: string[] = [];
    for (let i = start; i <= end; i++) {
      const bip32Path: number[] = facade.bip32Path(i);
      privateKeys.push(
        new Bip32(MnemonicService.curveName, MnemonicService.mnemonicLanguage)
          .fromMnemonic(this.mnemonic, '')
          .derivePath(bip32Path)
          .privateKey.toString()
      );
    }
    return privateKeys;
  }
}
