import { useState, useEffect } from 'react';

import { NetworkController } from '@/controller/NetworkController';
import { NetworkType, NodeInfo } from '@/models/NetworkModels';

type UseGetNodeListResult = {
  /** データの取得中 */
  isLoading: boolean;
  /** 取得したデータの配列 */
  nodeList: NodeInfo[];
  /** 次のデータを取得する */
  next: () => Promise<void>;
  /** 取得したデータと offset をリセットする */
  refresh: () => Promise<void>;
  /** エラー */
  error: Error | null;
};

/**
 * Node List を取得する
 * - networkType に null を渡す場合、端末の設定読み取り待ちとして取得を保留にし、待機する
 */
export function useGetNodeList(networkType: NetworkType | null): UseGetNodeListResult {
  const [nodeList, setNodeList] = useState<{ [key: string]: NodeInfo[] }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [offset, setOffset] = useState(0);

  const next = async () => {
    if (networkType === null) return;
    try {
      await _search(offset);
    } catch (err) {
      console.error(err);
    }
  };

  const refresh = async () => {
    if (networkType === null) return;
    try {
      setIsLoading(false);
      setNodeList({});
      setError(null);
      setOffset(0);
      console.debug(`useGetNodeList: start search, networkType: ${networkType}, offset: 0`);
      await _search(0);
    } catch (err) {
      console.error(`useGetNodeList: failed to refresh node list, ${err}`);
    }
  };

  const _search = async (_offset: number) => {
    if (networkType === null) return;
    try {
      setIsLoading(true);
      const nodeListResult = await NetworkController.getNodeList(networkType, _offset * 20);
      const enableList = nodeListResult.filter((e) => e.connection === 'connected');
      setNodeList((prev) =>
        _offset === 0 ? { [_offset.toString()]: enableList } : { ...prev, [_offset.toString()]: enableList }
      );
      setError(null);
      setOffset(_offset + 1);
      console.debug(
        `useGetNodeList: search completed, networkType: ${networkType}, offset: ${_offset}, result: ${enableList.length}`
      );
    } catch (err) {
      setError(err instanceof Error ? err : new Error(err as string));
    } finally {
      setIsLoading(false);
    }
  };

  // 検索キーワードが変更されたら、リセットしてからデータの取得を開始
  useEffect(() => {
    if (networkType !== null) {
      refresh();
    }
  }, [networkType]);

  return {
    next,
    refresh,
    isLoading,
    error,
    nodeList: Object.keys(nodeList).flatMap((key) => nodeList[key]),
  };
}
