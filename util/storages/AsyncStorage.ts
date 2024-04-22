import RNAsyncStorage from '@react-native-async-storage/async-storage';

// re-export
export class AsyncStorage {
  private key: string;

  constructor(key: string) {
    this.key = key;
  }

  public async getItem(): Promise<string | null> {
    try {
      const value = await RNAsyncStorage.default.getItem(this.key);
      return value;
    } catch (error) {
      throw new Error(`Error when trying to get item from AsyncStorage: ${error}`);
    }
  }

  public async setItem(value: string): Promise<void> {
    try {
      await RNAsyncStorage.default.setItem(this.key, value);
    } catch (error) {
      throw new Error(`Error when trying to set item in AsyncStorage: ${error}`);
    }
  }

  public async removeItem(): Promise<void> {
    try {
      await RNAsyncStorage.default.removeItem(this.key);
    } catch (error) {
      throw new Error(`Error when trying to remove item from AsyncStorage: ${error}`);
    }
  }

  public static async clear(): Promise<void> {
    try {
      await RNAsyncStorage.default.clear();
    } catch (error) {
      throw new Error(`Error when trying to clear AsyncStorage: ${error}`);
    }
  }
}
