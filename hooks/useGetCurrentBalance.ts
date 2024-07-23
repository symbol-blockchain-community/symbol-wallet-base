import { useState, useEffect, useMemo } from 'react';

import { AccountInfoController } from '@/controller/AccountInfoController';
import { useI18n } from '@/hooks/useI18n';
import { Mosaic } from '@/models/MosaicModel';
import { ResponseError } from '@/services/NodeClientService/index';

type IResult = {
  isLoading: boolean;
  /** 主軸通過の絶対値残高 */
  balance: number;
  /** 主軸通過以外の MosaicId と 絶対値 MosaicAmount 情報の配列。デフォルトは最大10件迄取得する。 */
  mosaics: Mosaic[];
  /** 残高を再取得する */
  refresh: () => Promise<void>;
  /** 次の5件のモザイクを取得する */
  loadMoreMosaics: () => Promise<void>;
  /** エラー */
  error: Error | null;
};

/** 一度に取得するモザイクの件数 */
export const FETCH_MOSAICS_LIMIT = 3;

/**
 * 指定されたアドレスの残高を取得する。アドレスに null が渡された場合は取得を保留とし、待機する
 *
 * - reload を呼ばれた場合、残高情報を再取得する
 * - mosaic は divisivility を取得し、絶対値に変更した値を返却する
 *
 * TODO: global context より現在選択されているノードを取得し、動的にノードを切り替える実装を行う
 */
export function useGetCurrentBalance(address: string | null, node: string | null): IResult {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [balance, setBalance] = useState<number>(0);
  const [mosaics, setMosaics] = useState<Mosaic[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [offset, setOffset] = useState<number>(0);
  const { t } = useI18n();

  const controller = useMemo(
    // ノードURL は暫定実装
    () => {
      if (address === null || node === null) return null;
      return new AccountInfoController(node, address);
    },
    [address, node]
  );

  const loadMosaics = async (newOffset: number) => {
    if (controller === null) return;
    setIsLoading(true);
    setError(null);
    try {
      const res = await controller.getAccountInfo(newOffset, FETCH_MOSAICS_LIMIT);
      setMosaics((prevMosaics) => [...prevMosaics, ...res.mosaics]);
      setBalance(res.balance);
      setOffset(newOffset + 5);
    } catch (err: any) {
      if (err instanceof ResponseError) {
        if (err.response.status === 404) {
          console.warn(`Account not found ${address} in ${node}`);
          setError(new Error(t('hooks.useGetCurrentBalance.accountNotFound')));
          return;
        }
      }
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMoreMosaics = async () => {
    await loadMosaics(offset);
  };

  useEffect(() => {
    if (controller === null) return;
    loadMosaics(0);
  }, [address, node]);
  const refresh = async () => {
    if (controller === null) return;
    setIsLoading(true);
    setError(null);
    controller
      .getAccountInfo(0, FETCH_MOSAICS_LIMIT)
      .then((res) => {
        setMosaics(res.mosaics);
        setBalance(res.balance);
      })
      .catch((err) => {
        console.error(err);
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return { isLoading, balance, mosaics, error, refresh, loadMoreMosaics };
}
