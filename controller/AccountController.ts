/* 

  Blockchain Account の追加、削除、変更処理を行います。
  変更内容は AsyncStorage に対しても同期されます。
  秘密鍵、ニーモニックのみ SecureStorage へ分けて保管されます。

*/

import { WalletModel } from '@/models/AccountModel';
import { InvalidValueError } from '@/models/ErrorModels';
import { NetworkType } from '@/models/NetworkModels';
import { AddressService } from '@/services/AddressService';
import { MnemonicService } from '@/services/MnemonicService';
import { PrivateKeyService } from '@/services/PrivateKeyService';
import { WalletService } from '@/services/WalletService';

export class AccountController {
  public address: AddressService;

  private constructor(public wallet: WalletModel) {
    this.address = AddressService.createFromPublicKey(wallet.publicKey, wallet.networkType);
  }

  /**
   * 新規秘密鍵を生成し、新たなアカウントを作成する。
   * 作成した PribateKeyService を元に WalletService を作成し、それぞれストレージへ保存する
   */
  public static async createNewPrivateKeyAccount(networkType: NetworkType): Promise<AccountController> {
    const privateKeyModel = await PrivateKeyService.generateNewPrivateKey().setToStorage(networkType);
    const walletService = await WalletService.setNewFullWallet(privateKeyModel);
    return new AccountController(walletService.wallet);
  }

  /**
   * 新規ニーモニックを作成し、SecureStorage へ保存する（ WALLET の初期作成時向け ）
   */
  public static async createNewNemomicAccount(networkType: NetworkType): Promise<AccountController> {
    const privateKey: string = MnemonicService.createRandom().getChildPrivateKey(0);
    const privateKeyModel = await PrivateKeyService.createFromPrivateKey(privateKey).setToStorage(networkType);
    const walletService = await WalletService.setNewFullWallet(privateKeyModel);
    return new AccountController(walletService.wallet);
  }

  /**
   * 既存のニーモニックより height を指定して秘密鍵を生成し、新たなアカウントを作成する。
   * 作成した PrivateKeyService を元に WalletService を作成し、それぞれストレージへ保存する
   */
  public static async createNewAccountByNemomic(networkType: NetworkType, height: number): Promise<AccountController> {
    const { mnemonic } = await MnemonicService.getFromStorage();
    const privateKey = MnemonicService.generateFromPhrase(mnemonic).getChildPrivateKey(height);
    const privateKeyModel = await PrivateKeyService.createFromPrivateKey(privateKey).setToStorage(networkType);
    const walletService = await WalletService.setNewFullWallet(privateKeyModel);
    return new AccountController(walletService.wallet);
  }

  /**
   * 使用可能な Wallet の一覧を取得する
   */
  public static async getWalletList(): Promise<WalletModel[]> {
    return await WalletService.getWallets();
  }

  /**
   * WalletId より AccountControler を作成する
   */
  public static async getByWalletId(walletId: string): Promise<AccountController> {
    const walletService = await WalletService.getByWalletId(walletId);
    return new AccountController(walletService.wallet);
  }

  /**
   * 現在の Wallet と PrivateKey を全て削除する
   * TODO: global context からの削除も本関数内で行う
   */
  public async deleteWallet(): Promise<void> {
    if (!this.wallet.privateKeyId) {
      throw new InvalidValueError('No private key is stored in the specified wallet');
    }
    await PrivateKeyService.deleteFromStorageById(this.wallet.privateKeyId);
    await WalletService.getByWalletId(this.wallet.id).then(async (s) => await s.removeWallet());
  }

  /**
   * 現在の Wallet の秘密鍵のみ削除する
   */
  public async deletePrivateKey(): Promise<void> {
    if (!this.wallet.privateKeyId) {
      throw new InvalidValueError('No private key is stored in the specified wallet');
    }
    await PrivateKeyService.deleteFromStorageById(this.wallet.privateKeyId);
    await WalletService.getByWalletId(this.wallet.id).then(async (s) => await s.removePrivateKeyId());
  }
}
