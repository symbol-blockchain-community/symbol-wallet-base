import { ConnectionStatus, NetworkInfo, NetworkType, NodeInfo } from '@/models/NetworkModels';
import { NetworkService, StorageModel } from '@/services/NetworkService';
import { NodeStatisticsService } from '@/services/NodeStatisticsService';

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
