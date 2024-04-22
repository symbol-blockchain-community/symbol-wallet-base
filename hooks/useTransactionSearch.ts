import { useState, useEffect } from 'react';

import { ConnectionError } from '@/models/ErrorModels';
import {
  Configuration,
  SearchConfirmedTransactionsRequest,
  TransactionInfoDTO,
  TransactionPage,
  TransactionRoutesApi,
} from '@/services/NodeClientService/index';

type Mode = 'confirmed' | 'unconfirmed' | 'partial';

type UseTransactionSearchResult = {
  /** データの取得中 */
  isLoading: boolean;
  /** 取得したデータの配列 */
  transactions: TransactionInfoDTO[];
  /** 次のデータを取得する */
  next: () => Promise<void>;
  /** 取得したデータと offset をリセットする */
  refresh: () => Promise<void>;
  /** エラー */
  error: Error | null;
};

/**
 * 指定したアドレスに起因するトランザクションの一覧を検索する
 * node 引数が null の場合、検索の実行を保留にする
 *
 * ```
 * const [address, setAddress] = useState<string>('NAE***');
 * const { error, isLoading, next, refresh, transactions } = useTransactionHistory('confirmed', {address});
 * ```
 */
export function useTransactionHistory(
  node: string | null,
  mode: Mode,
  query: Omit<SearchConfirmedTransactionsRequest, 'pageNumber'>
): UseTransactionSearchResult {
  // TransactionInfoDTO は一次元配列では取得の失敗時にどのデータが重複しているか困難で有るため、dict に対して offset ごとに格納する
  const [transactions, setTransactions] = useState<{ [key: string]: TransactionInfoDTO[] }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [offset, setOffset] = useState(0);
  const config = new Configuration({ basePath: node || undefined });
  const transactionRoute = new TransactionRoutesApi(config);

  const next = async () => {
    if (node === null) return;
    try {
      await _search(offset);
    } catch (err) {
      console.error(err);
    }
  };

  const refresh = async () => {
    if (node === null) return;
    try {
      setIsLoading(false);
      setTransactions({});
      setError(null);
      setOffset(0);
      await _search(0);
    } catch (err) {
      console.error(err);
    }
  };

  const _search = async (_offset: number) => {
    if (node === null) return;
    try {
      setIsLoading(true);
      const pageNumber = _offset + 1;

      const res =
        mode === 'partial'
          ? await transactionRoute.searchPartialTransactionsRaw({ ...query, pageNumber })
          : mode === 'unconfirmed'
            ? await transactionRoute.searchUnconfirmedTransactionsRaw({ ...query, pageNumber })
            : await transactionRoute.searchConfirmedTransactionsRaw({ ...query, pageNumber });

      if (res.raw.status < 199 || res.raw.status > 299) {
        throw new ConnectionError('Failed to retrieve transaction');
      }
      const body = (await res.raw.json()) as TransactionPage;

      console.debug(`useTransactionSearch: search result, ${body.data.length}, ${node}, ${JSON.stringify(query)}`);

      setTransactions((prev) =>
        pageNumber === 1 ? { [pageNumber.toString()]: body.data } : { ...prev, [pageNumber.toString()]: body.data }
      );
      setError(null);
      setOffset(pageNumber);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(err as string));
    } finally {
      setIsLoading(false);
    }
  };

  // 検索キーワードが変更されたら、リセットしてからデータの取得を開始
  useEffect(() => {
    if (node === null) return;
    refresh();
  }, [
    node,
    query.address,
    query.embedded,
    query.fromHeight,
    query.fromTransferAmount,
    query.height,
    query.offset,
    query.order,
    query.pageSize,
    query.recipientAddress,
    query.signerPublicKey,
    query.toHeight,
    query.toTransferAmount,
    query.transferMosaicId,
    query.type,
  ]);

  return {
    next,
    refresh,
    isLoading,
    error,
    transactions: Object.keys(transactions)
      .flatMap((key) => transactions[key])
      .sort((a, b) => Number(b.meta.timestamp) - Number(a.meta.timestamp)),
  };
}
