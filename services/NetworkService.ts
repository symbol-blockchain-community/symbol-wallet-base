/*

  Symbol Blockchain Node の AsyncStorage への書き込みや変更、削除機能を提供します。
  また、ノードの状態を取得する API を提供します。

*/
import { InvalidValueError } from '@/models/ErrorModels';
import { NetworkType } from '@/models/NetworkModels';
import { Configuration, NodeRoutesApi } from '@/services/NodeClientService/index';
import { STORAGE_KEYS } from '@/util/configs/storage-keys';
import { AsyncStorage } from '@/util/storages/AsyncStorage';
import { hexToStrNetworkType } from '@/util/symbol/network';

export type StorageModel = {
  /** 共通の設定値 */
  common: {
    currentNetworkType: string;
  };
  /** ネットワーク毎に保持する設定値 */
  networks: {
    /** key = Networktype */
    [key: string]: {
      /** 該当ネットワーク選択時に使用する NODE URL */
      restGatewayUrl: string;
    };
  };
};

export class NetworkService extends AsyncStorage {
  private nodeRoutes: NodeRoutesApi;
  public networkType: NetworkType;
  public restGatewayUrl: string;

  constructor(restGatewayUrl: string, networkType: NetworkType) {
    super(STORAGE_KEYS.async.NETWORK);

    try {
      // URL 形式のバリデーションチェック
      // eslint-disable-next-line no-new
      new URL(restGatewayUrl);
    } catch {
      throw new InvalidValueError('Invalid Node URL');
    }

    const config = new Configuration({ basePath: restGatewayUrl });
    this.nodeRoutes = new NodeRoutesApi(config);
    this.networkType = networkType;
    this.restGatewayUrl = restGatewayUrl;
  }

  /**
   * 現在のクラス属性のノード情報を、WALLETの接続先ノードとして更新する
   */
  public async setAccessPointToStorage(): Promise<void> {
    const oldStorageData: StorageModel = JSON.parse((await this.getItem()) || '{}');
    const storageData: StorageModel = {
      common: {
        currentNetworkType: this.networkType,
      },
      networks: {
        ...oldStorageData?.networks,
        [this.networkType]: {
          restGatewayUrl: this.restGatewayUrl,
        },
      },
    };
    await this.setItem(JSON.stringify(storageData));
  }

  /** ノードが生きているか確認する */
  public async getStatus(): Promise<boolean> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);
    try {
      const res = await this.nodeRoutes.getNodeHealth({ signal: controller.signal });
      return res.status.apiNode === 'up' && res.status.db === 'up';
    } catch (err) {
      console.warn(`getStatus: node ${this.restGatewayUrl} error, ${err}`);
      return false;
    } finally {
      clearTimeout(timeout);
    }
  }

  /** 保存されているネットワークタイプの一覧を返却する */
  static async getNetworkTypesByStorage(): Promise<string[] | null> {
    const storage = await new AsyncStorage(STORAGE_KEYS.async.NETWORK).getItem();
    if (!storage) return null;

    const storageData: StorageModel = JSON.parse(storage);
    if (!storageData) {
      return null;
    }
    return Object.keys(storageData.networks);
  }

  /** 指定したネットワークに属する設定値を取得する */
  static async getNetworkInfoByNetworkType(networkType: string): Promise<StorageModel['networks'][string] | null> {
    const storage = await new AsyncStorage(STORAGE_KEYS.async.NETWORK).getItem();
    if (!storage) return null;

    const storageData: StorageModel = JSON.parse(storage);
    if (!storageData) {
      return null;
    }
    return storageData.networks[networkType];
  }

  /** 指定した NetworkType と実際の Node の NetworkType が一致するか検証する */
  public async validateNetworkType(): Promise<boolean> {
    const info = await this.nodeRoutes.getNodeInfo();
    return hexToStrNetworkType(info.networkIdentifier) === this.networkType;
  }

  /** ストレージの設定を元にネットワークインスタンスを作成する */
  static async createByStorage(): Promise<NetworkService | null> {
    const storage = await new AsyncStorage(STORAGE_KEYS.async.NETWORK).getItem();
    if (!storage) return null;

    const model: StorageModel = JSON.parse(storage);
    if (!model.common.currentNetworkType) return null;

    const networkType = model.common.currentNetworkType as NetworkType;
    const restGatewayUrl = model.networks[networkType]?.restGatewayUrl;
    if (!restGatewayUrl) return null;

    return new NetworkService(restGatewayUrl, networkType);
  }
}
