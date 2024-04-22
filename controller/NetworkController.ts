import { ConnectionError } from '@/models/ErrorModels.js';
import { ConnectionStatus, NetworkInfo, NetworkType, NodeInfo } from '@/models/NetworkModels.js';
import { NetworkService, StorageModel } from '@/services/NetworkService';
import { NodeStatisticsService } from '@/services/NodeStatisticsService';
import { modeConfig } from '@/util/configs/mode.js';

export class NetworkController {
  private constructor() {}

  /**
   * 現在のストレージの設定値よりネットワークの設定値を取得する
   * 設定値が存在しない場合は null を返し、フロントエンド側ではユーザーがネットワーク設定を選び直す事を期待する
   * また、ノードへ接続出来ない場合は connect ステータスを disconnect とする
   */
  public static async getCurrentSettings(): Promise<NetworkInfo | null> {
    const service = await NetworkService.createByStorage();
    if (!service) {
      return null;
    }

    const status = await service.getStatus();
    return {
      network: service,
      connection: status ? 'connected' : 'disconnected',
    };
  }

  /**
   * Network Storage を検証し、デフォルト値が存在しない場合書き込みを行う
   * デフォルト値:
   * - NetworkType = mainnet
   * - Node = ランダムに選出
   */
  public static async initCheck(): Promise<void> {
    const service = await NetworkService.createByStorage();
    console.log(`initCheck: current network type is ${service?.networkType}, node is ${service?.restGatewayUrl}`);
    if (!service || !service.restGatewayUrl) {
      // node list の取得を 3 度試みる。3 度共 NG の場合は error
      let nodes: (NodeInfo & { connection: ConnectionStatus })[] = [];
      const currentNetworkType = service?.networkType || modeConfig.DEFAULT_NETWORK_TYPE;
      for (let i = 0; i < 3; i++) {
        nodes = await NetworkController.getNodeList(currentNetworkType, i * 20);
        nodes = nodes.filter((node) => node.connection === 'connected');
        if (nodes.length > 0) {
          break;
        }
      }
      if (nodes.length === 0) {
        throw new ConnectionError('Failed to get node list');
      }

      // 取得したノードリストより1つストレージへ登録を行う
      await NetworkController.setSettings(modeConfig.DEFAULT_NETWORK_TYPE, {
        restGatewayUrl: nodes[0].restGatewayUrl,
      });
      console.log(
        `initCheck: set default network type to ${modeConfig.DEFAULT_NETWORK_TYPE}, node is ${nodes[0].restGatewayUrl}`
      );
    }
  }

  /**
   * NetworkType を切り替える。
   * 該当の NetworkType の接続先ノードの情報がまだ未設定である場合、統計サーバーより候補を取得しランダムに登録する
   */
  public static async switchNetworkType(networkType: NetworkType): Promise<void> {
    const service = await NetworkService.getNetworkInfoByNetworkType(networkType);
    if (!service || !service.restGatewayUrl) {
      // node list の取得を 3 度試みる。3 度共 NG の場合は error
      let nodes: (NodeInfo & { connection: ConnectionStatus })[] = [];
      for (let i = 0; i < 3; i++) {
        nodes = await NetworkController.getNodeList(networkType, i * 20);
        nodes = nodes.filter((node) => node.connection === 'connected');
        if (nodes.length > 0) {
          break;
        }
      }
      if (nodes.length === 0) {
        throw new ConnectionError('Failed to get node list');
      }
      await NetworkController.setSettings(networkType, { restGatewayUrl: nodes[0].restGatewayUrl });
    } else {
      await NetworkController.setSettings(networkType, { restGatewayUrl: service.restGatewayUrl });
    }
  }

  /**
   * 対象のノードが指定された NetworkType のものであるか検証する（かつ有効なノードであるのか検証する
   */
  public static async isHealthNode(networkType: NetworkType, restGatewayUrl: string): Promise<boolean> {
    try {
      const service = new NetworkService(restGatewayUrl, networkType);
      if (await service.getStatus()) {
        return await service.validateNetworkType();
      } else {
        return false;
      }
    } catch (err) {
      console.warn(`isHealthNode: failed to connect node, ${restGatewayUrl} ${err}`);
      return false;
    }
  }

  /**
   * 指定したネットワークタイプに属する設定の変更をストレージへ反映する
   * 変更後、フロントエンド側はリロードする想定
   */
  public static async setSettings(networkType: NetworkType, data: StorageModel['networks'][string]): Promise<void> {
    const service = new NetworkService(data.restGatewayUrl, networkType);
    await service.setAccessPointToStorage();
  }

  /**
   * ノードリストのキャッシュをローカルより20件取得し、死活監視の上返却する。
   * 死活監視結果は順次返却する為、フロントエンドでは取り出した値より state へ反映させる想定。
   * キャッシュ期限 1日（24 * 60 * 60 * 1000）を超過している場合、Statistics Server より取得 + 保管する
   */
  public static async getNodeList(
    networkType: NetworkType,
    offset: number = 0
  ): Promise<(NodeInfo & { connection: ConnectionStatus })[]> {
    // get node list
    const service = new NodeStatisticsService(networkType);
    const nodeListAll: NodeInfo[] = await service.getNodeList();
    const nodeList = nodeListAll.slice(offset, offset + 20);
    // check status
    return await Promise.all(
      nodeList.map(async (node) => {
        const status = await new NetworkService(node.restGatewayUrl, networkType).getStatus();
        return { ...node, connection: status ? 'connected' : 'disconnected' };
      })
    );
  }
}
