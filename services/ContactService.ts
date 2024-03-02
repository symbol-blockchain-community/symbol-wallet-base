/*

 連絡帳の管理、読み出し

*/

import { randomUUID } from 'expo-crypto';

import { ContactModel } from '@/models/AccountModel';
import { NetworkType } from '@/models/NetworkModels';
import { STORAGE_KEYS } from '@/util/configs/storage-keys';
import { AsyncStorage } from '@/util/storages/AsyncStorage';

/**
 * Manage Symbol Address Contacts
 */
export class ContactService extends AsyncStorage {
  private constructor(private contacts: ContactModel[]) {
    super(STORAGE_KEYS.async.CONTACT);
  }

  /** 連絡帳に新しいアカウントを追加する */
  public async add(data: Omit<ContactModel, 'id'>): Promise<void> {
    const id = randomUUID();
    this.contacts.push({ ...data, id });
    await this.setItem(JSON.stringify(this.contacts));
  }

  /** 連絡帳から既存のアカウントを削除する */
  public async remove(id: string): Promise<void> {
    this.contacts = this.contacts.filter((e) => e.id !== id);
    await this.setItem(JSON.stringify(this.contacts));
  }

  /** 連絡帳の既存のアカウントを更新する */
  public async update(data: ContactModel): Promise<void> {
    this.contacts = this.contacts.map((e) => {
      return e.id === data.id ? { ...data } : e;
    });
  }

  /** 連絡帳で検索する */
  public async search(keyword: string, offset: number): Promise<ContactModel[]> {
    const result = this.contacts.filter((e) => e.name.includes(keyword));
    return result.slice(offset, offset + 20);
  }

  /** 連絡帳情報を取得する。 一度に20件ずつ取得し、offset により更新する */
  public async get(offset: number): Promise<ContactModel[]> {
    return this.contacts.slice(offset, offset + 20);
  }

  /** ローカルストレージより保存された連絡帳データを全て読みだす */
  static async create(networkType: NetworkType): Promise<ContactService> {
    const storage = new AsyncStorage(STORAGE_KEYS.async.CONTACT);
    const item = JSON.parse(await storage.getItem()) as ContactModel[];
    if (!item) {
      return new ContactService([]);
    }

    return new ContactService(item.filter((e) => e.networkType === networkType));
  }
}
