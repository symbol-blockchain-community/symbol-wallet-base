import { getLocales } from 'expo-localization';

import { STORAGE_KEYS } from '@/util/configs/storage-keys';
import { AsyncStorage } from '@/util/storages/AsyncStorage';

export class LanguageService extends AsyncStorage {
  public constructor() {
    super(STORAGE_KEYS.async.LANGUAGE);
  }

  public async getLanguageCode(): Promise<string> {
    const item = await this.getItem();
    if (!item) {
      // 端末で設定されている言語を返す
      const { languageCode } = getLocales()[0];
      return languageCode;
    }
    return item;
  }

  public async setLanguageCode(languageCode: string) {
    await this.setItem(languageCode);
  }
}
