import { ConnectionError } from '@/models/ErrorModels';
import { NetworkType, NodeInfo } from '@/models/NetworkModels';
import { NETWORK_PROPERTIES } from '@/util/configs/network-properties';
import { STORAGE_KEYS } from '@/util/configs/storage-keys';
import { AsyncStorage } from '@/util/storages/AsyncStorage';

type StorageModel = {
  [key: string]: {
    expire: number;
    nodeList: NodeInfo[];
  };
};

/**
 * ノードの統計情報サービスより情報の取得・更新を行う
 * 取得した情報はキャッシュとしてストレージへ保存し、1日以上経過した場合、再度統計サーバーより取得してローカルストレージを更新する
 */
export class NodeStatisticsService extends AsyncStorage {
  private static readonly CACHE_EXPIRE_TIME = 1000 * 60 * 60 * 24; // 1日
  private statisticsServer: string;
  private networkType: NetworkType;

  public constructor(networkType: NetworkType) {
    super(STORAGE_KEYS.async.NODESTATISTICS);
    this.networkType = networkType;
    this.statisticsServer = NETWORK_PROPERTIES[networkType].statisticsNodeServerUrl;
  }

  /** 統計サーバーよりノードの一覧を取得する */
  private async getNodeListByStatistics(): Promise<NodeInfo[]> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);
    try {
      const header = new Headers();
      header.append('Accept', 'application/json');
      header.append('Content-Type', 'application/json');

      const res = await fetch(this.statisticsServer, {
        method: 'GET',
        headers: header,
        cache: 'no-cache',
        signal: controller.signal,
      });

      const statisticsResult = await res.json();
      const nodeInfoList: NodeInfo[] = [];
      for (const e of statisticsResult) {
        // apiStatus or isAvailable が false の場合は除外 + allnodes を除外 + websocket 無効は除外
        if (!e.apiStatus) continue;
        if (!e.apiStatus.isHttpsEnabled || !e.apiStatus.isAvailable) continue;
        if (e.apiStatus.restGatewayUrl.includes('.allnodes.me:')) continue;
        if (!e.apiStatus.webSocket.isAvailable || !e.apiStatus.webSocket.wss) continue;
        // URL バリデーション
        try {
          // eslint-disable-next-line no-new
          new URL(e.apiStatus.restGatewayUrl);
          // eslint-disable-next-line no-new
          new URL(e.apiStatus.webSocket.url);
        } catch {
          continue;
        }
        nodeInfoList.push({
          friendlyName: e.friendlyName,
          networkIdentifier: e.networkIdentifier,
          restGatewayUrl: e.apiStatus.restGatewayUrl,
          websocketUrl: e.apiStatus.webSocket.url,
        });
      }
      return nodeInfoList;
    } catch (err) {
      console.error(err);
      throw new ConnectionError(`Statistics Server ${this.statisticsServer} Error`);
    } finally {
      clearTimeout(timeout);
    }
  }

  /** 最新の NodeInfo[] を AsyncStorage に格納する */
  private async setNodeList(nodeList: NodeInfo[]): Promise<void> {
    const cache = await this.getItem();
    if (cache) {
      const storageData: StorageModel = {
        ...JSON.parse(cache),
        [this.networkType]: {
          expire: new Date().getTime() + NodeStatisticsService.CACHE_EXPIRE_TIME,
          nodeList,
        },
      };
      await this.setItem(JSON.stringify(storageData));
    } else {
      const storageData: StorageModel = {
        [this.networkType]: {
          expire: new Date().getTime() + NodeStatisticsService.CACHE_EXPIRE_TIME,
          nodeList,
        },
      };
      await this.setItem(JSON.stringify(storageData));
    }
  }

  /** ローカルストレージにキャッシュされているノード情報のリストを強制的にパージし、新しい一覧に置き換える */
  public async pargeAsyncStorage(): Promise<void> {
    const nodeList: NodeInfo[] = await this.getNodeList();
    await this.setNodeList(nodeList);
  }

  /** NodeInfo[] を取得する */
  public async getNodeList(): Promise<NodeInfo[]> {
    const cache = await this.getItem();
    if (!cache) {
      // 既存のデータが存在しない場合、統計サーバーより再取得を行う
      const nodeList: NodeInfo[] = await this.getNodeListByStatistics();
      this.setNodeList(nodeList);
      return nodeList;
    }

    const storageData: StorageModel = JSON.parse(cache);
    const currentNetworkData = storageData[this.networkType];

    // storageData が null ではなく、かつ expire の期限を超過していない場合、storageData をそのまま返却する
    if (
      currentNetworkData &&
      currentNetworkData.nodeList.length !== 0 &&
      new Date().getTime() < currentNetworkData.expire
    ) {
      console.log(currentNetworkData.nodeList.length);
      return currentNetworkData.nodeList;
    } else {
      // 既存のデータが存在しない、またはキャッシュが古い場合、統計サーバーより再取得を行う
      const nodeList: NodeInfo[] = await this.getNodeListByStatistics();
      this.setNodeList(nodeList);
      return nodeList;
    }
  }
}
