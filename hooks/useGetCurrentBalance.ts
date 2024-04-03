import { useState, useEffect, useMemo } from 'react';

import { AccountInfoController } from '@/controller/AccountInfoController';
import { Mosaic } from '@/models/MosaicModel';
import { ResponseError } from '@/services/NodeClientService';

type IResult = {
  isLoading: boolean;
  /** 主軸通過の絶対値残高 */
  balance: number;
  /** 主軸通過以外の MosaicId と 絶対値 MosaicAmount 情報の配列。デフォルトは最大10件迄取得する。 */
  mosaics: Mosaic[];
  /** 残高を再取得する */
  refresh: () => Promise<void>;
  /** エラー */
  error: Error | null;
};

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

  const controller = useMemo(
    // ノードURL は暫定実装
    () => {
      if (address === null || node === null) return null;
      return new AccountInfoController(node, address);
    },
    [address, node]
  );

  useEffect(() => {
    if (controller === null) return;
    let unmounted = false;
    setIsLoading(true);
    setError(null);
    controller
      .getAccountInfo()
      .then((res) => {
        if (!unmounted) setMosaics(res.mosaics);
        if (!unmounted) setBalance(res.balance);
      })
      .catch((err) => {
        if (err instanceof ResponseError) {
          if (err.response.status === 404) {
            console.warn(`Account not found ${address} in ${node}`);
            if (!unmounted) setError(new Error(`Account not found ${address} in ${node}`));
            return;
          }
        }
        if (!unmounted) setError(err);
      })
      .finally(() => {
        if (!unmounted) setIsLoading(false);
      });
    return () => {
      unmounted = true;
    };
  }, [address]);

  const refresh = async () => {
    if (controller === null) return;
    setIsLoading(true);
    setError(null);
    controller
      .getAccountInfo()
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

  return { isLoading, balance, mosaics, error, refresh };
}
