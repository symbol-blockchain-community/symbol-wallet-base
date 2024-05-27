/*

  プライベートキーの発行や SecureStorage への書き込み、削除機能を提供します。
  以下の実装の多くは symbol-sdk@2 を元に作成されています。

*/

import { getRandomBytes, randomUUID } from 'expo-crypto';

import { PrivateKeyModel } from '@/models/AccountModel';
import { InvalidValueError } from '@/models/ErrorModels';
import { NetworkType } from '@/models/NetworkModels';
// FIXME import { AddressService } from '@/services/AddressService';
import { STORAGE_KEYS } from '@/util/configs/storage-keys';
import { SecureStorage } from '@/util/storages/SecureStorage';

/**
 * Manage Symbol Account PrivateKey
 */
export class PrivateKeyService extends SecureStorage {
  public static readonly KEY_LENGTH = 32;
  public privateKey: string;
  public publicKey: string;

  private constructor(privateKey: Uint8Array) {
    super(STORAGE_KEYS.secure.PRIVATEKEY);

    if (privateKey.length !== PrivateKeyService.KEY_LENGTH) {
      throw Error(`private key has unexpected size: ${privateKey.length}`);
    }

    this.privateKey = Buffer.from(privateKey).toString('hex');
    // FIXME const keypair = nacl.sign.keyPair.fromSeed(privateKey);
    // FIXME this.publicKey = Buffer.from(keypair.publicKey).toString('hex');

    this.publicKey = '';
  }

  /** アドレスを取得する */
  // FIXME public getAddress(networkType: NetworkType): AddressService {
  //   return AddressService.createFromPublicKey(this.publicKey, networkType);
  // }
  public getAddress(networkType: NetworkType) {
    return null;
  }

  /** ランダムな秘密鍵の発行し PrivateKeyService を作成する */
  public static generateNewPrivateKey(): PrivateKeyService {
    const v = getRandomBytes(32);
    return new PrivateKeyService(v);
  }

  /** 秘密鍵文字列より PrivateKeyService を作成する */
  public static createFromPrivateKey(privateKey: string): PrivateKeyService {
    const bytes = Buffer.from(privateKey, 'hex');
    return new PrivateKeyService(bytes);
  }

  /** 指定された id の秘密鍵を SeucreStorage より削除する */
  public static async deleteFromStorageById(id: string): Promise<void> {
    const storage = new SecureStorage(STORAGE_KEYS.secure.PRIVATEKEY);
    const data: PrivateKeyModel[] = JSON.parse((await storage.getSecretItem()) || '[]');
    if (!data) {
      throw new InvalidValueError('Failed to read from storage.');
    }
    const newData = data.filter((e) => e.id !== id);
    await storage.setSecretItem(JSON.stringify(newData));
  }

  /** 指定された id の PrivateKeyModel を SecureStorage より取得する */
  public static async getFromStorageById(id: string): Promise<PrivateKeyModel> {
    const storage = new SecureStorage(STORAGE_KEYS.secure.PRIVATEKEY);
    const data: PrivateKeyModel[] = JSON.parse((await storage.getSecretItem()) || '[]');
    const result = data.find((e) => e.id === id);
    if (!result) {
      throw new InvalidValueError('Failed to read from storage.');
    } else {
      return result;
    }
  }

  /** 現在の秘密鍵を SecureStorage へ保管する。同一 NetworkType かつ秘密鍵文字列がある場合は ERROR */
  public async setToStorage(networkType: NetworkType): Promise<PrivateKeyModel> {
    // 重複の検証
    const storageResult = await this.getSecretItem();
    let oldData: PrivateKeyModel[] = [];
    if (storageResult) {
      oldData = JSON.parse(storageResult);
      for (const v of oldData) {
        if (v.privateKey === this.privateKey && v.networkType === networkType) {
          throw new InvalidValueError('Duplicate private key');
        }
      }
    }
    // 書き込み
    const id = randomUUID();
    const newPrivateKeyModel: PrivateKeyModel = { privateKey: this.privateKey, id, networkType };
    await this.setSecretItem(JSON.stringify([...oldData, newPrivateKeyModel]));
    return newPrivateKeyModel;
  }
}
