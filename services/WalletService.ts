/*

 アドレス、公開鍵、ネットワーク情報を持つ Wallet 情報の管理を行う

*/

import { randomUUID } from 'expo-crypto';

import { PrivateKeyModel, WalletModel } from '@/models/AccountModel';
import { InvalidValueError } from '@/models/ErrorModels';
import { NetworkType } from '@/models/NetworkModels';
import { AddressService } from '@/services/AddressService';
import { PrivateKeyService } from '@/services/PrivateKeyService';
import { STORAGE_KEYS } from '@/util/configs/storage-keys';
import { AsyncStorage } from '@/util/storages/AsyncStorage';
import { longTextToShort } from '@/util/text';

/**
 * Manage Symbol Wallet
 */
export class WalletService extends AsyncStorage {
  private constructor(public readonly wallet: WalletModel) {
    super(STORAGE_KEYS.async.WALLET);
  }

  /** 現在の Wallet 情報を削除します */
  public async removeWallet(): Promise<void> {
    const wallets: WalletModel[] | null = JSON.parse((await this.getItem()) || 'null');
    if (!wallets) throw new InvalidValueError('Failed to read from storage.');

    // 一致する Wallet を削除する
    const index = wallets.findIndex((wallet) => wallet.id === this.wallet.id);
    if (index === -1) {
      throw new InvalidValueError('Wallet not found.');
    }
    const newData: WalletModel[] = wallets.filter((w) => w.id !== this.wallet.id);
    await this.setItem(JSON.stringify(newData));
  }

  /** 現在 の WalletModel の privateKeyId を削除します */
  public async removePrivateKeyId(): Promise<void> {
    const wallets: WalletModel[] | null = JSON.parse((await this.getItem()) || 'null');
    if (!wallets) throw new InvalidValueError('Failed to read from storage.');

    // 一致する privateKeyId を削除する
    for (const wallet of wallets) {
      if (wallet.privateKeyId === this.wallet.id) {
        wallet.privateKeyId = null;
      }
    }

    await this.setItem(JSON.stringify(wallets));
  }

  /** 保存されている WalletModel[] を返却します */
  public static async getWallets(): Promise<WalletModel[]> {
    const storage = new AsyncStorage(STORAGE_KEYS.async.WALLET);
    const data: WalletModel[] = JSON.parse((await storage.getItem()) || '[]');
    return data || [];
  }

  /** PrivateKeyModel より新規 Wallet を作成し、 AsyncStorage に追加します */
  public static async setNewFullWallet(model: PrivateKeyModel, height?: number): Promise<WalletService> {
    const storage = new AsyncStorage(STORAGE_KEYS.async.WALLET);
    const oldData: WalletModel[] = JSON.parse((await storage.getItem()) || '[]');
    const privateKeyService = new PrivateKeyService(model.privateKey);
    const data: WalletModel = {
      id: randomUUID(),
      name: longTextToShort(privateKeyService.getAddress(model.networkType).plain()),
      networkType: model.networkType,
      publicKey: privateKeyService.publicKey,
      privateKeyId: model.id,
      height: height || null,
    };
    if (!oldData) {
      // 既存のデータが存在しない場合、そのまま書き込みを行う
      await storage.setItem(JSON.stringify([data]));
    } else {
      // 既に oldData に同じ NetworkType と PublicKey の組み合わせが存在する場合、書き込みを行わない
      const isExist = oldData.find(
        (o) => o.networkType === model.networkType && o.publicKey === privateKeyService.publicKey
      );
      if (isExist) {
        throw new InvalidValueError('Duplicate wallet');
      }

      await storage.setItem(JSON.stringify([...oldData, data]));
    }

    return new WalletService(data);
  }

  /** 公開鍵より秘密鍵を持たない新規 Wallet を作成し、AsyncStorage に追加します */
  public static async setNewWallet(networkType: NetworkType, publicKey: string): Promise<WalletService> {
    const storage = new AsyncStorage(STORAGE_KEYS.async.WALLET);
    const oldData: WalletModel[] = JSON.parse((await storage.getItem()) || '[]');
    const address = AddressService.createFromPublicKey(publicKey, networkType);
    const data: WalletModel = {
      id: randomUUID(),
      name: longTextToShort(address.plain()),
      networkType,
      publicKey,
      privateKeyId: null,
      height: null,
    };
    if (!oldData) {
      // 既存のデータが存在しない場合、そのまま書き込みを行う
      await storage.setItem(JSON.stringify([data]));
    } else {
      // 既に oldData に同じ NetworkType と PublicKey の組み合わせが存在する場合、書き込みを行わない
      const isExist = oldData.find((o) => o.networkType === networkType && o.publicKey === publicKey);
      if (isExist) {
        throw new InvalidValueError('Duplicate wallet');
      }

      await storage.setItem(JSON.stringify([...oldData, data]));
    }

    return new WalletService(data);
  }

  /** WalletModel.id より WalletService インスタンスを作成します */
  public static async getByWalletId(id: string): Promise<WalletService> {
    const storage = new AsyncStorage(STORAGE_KEYS.async.WALLET);
    const data: WalletModel[] = JSON.parse((await storage.getItem()) || '[]');
    if (!data) {
      throw new InvalidValueError('Failed to read from storage.');
    } else {
      const result = data.find((e) => e.id === id);
      if (!result) {
        throw new InvalidValueError('Failed to read from storage.');
      } else {
        return new WalletService(result);
      }
    }
  }
}
