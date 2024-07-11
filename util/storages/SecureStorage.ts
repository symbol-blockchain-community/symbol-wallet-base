import * as Device from 'expo-device';
import * as SecureStore from 'expo-secure-store';

export class SecureStorage {
  private key: string;

  constructor(key: string) {
    this.key = key;
  }

  public async getSecretItem(): Promise<string | null> {
    try {
      if (Device.isDevice) {
        return (await SecureStore.getItemAsync(this.key, { requireAuthentication: true })) as string | null;
      } else {
        return (await SecureStore.getItemAsync(this.key)) as string | null;
      }
    } catch (error) {
      throw new Error(`Error when trying to get item from SecureStore: ${error}`);
    }
  }

  public async setSecretItem(value: string): Promise<void> {
    try {
      if (Device.isDevice) {
        await SecureStore.setItemAsync(this.key, value, { requireAuthentication: true });
      } else {
        await SecureStore.setItemAsync(this.key, value);
      }
    } catch (error) {
      console.error(error);
      throw new Error(`Error when trying to set item in SecureStore: ${error}`);
    }
  }

  public async resetSecretItem(): Promise<void> {
    try {
      if (Device.isDevice) {
        await SecureStore.deleteItemAsync(this.key, { requireAuthentication: true });
      } else {
        await SecureStore.deleteItemAsync(this.key);
      }
    } catch (error) {
      throw new Error(`Error when trying to remove item from SecureStore: ${error}`);
    }
  }
}
