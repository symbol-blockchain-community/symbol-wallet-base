import { useState, useEffect } from 'react';

import { AccountController } from '@/controller/AccountController.js';
import { WalletModel } from '@/models/AccountModel.js';
import { StorageError } from '@/models/ErrorModels.js';

type ILoadWallets = {
  isLoading: boolean;
  wallets: WalletModel[];
  error: Error | null;
};

/**
 * component のマウント時に SecureStorage 上に格納されている wallet の一覧を取得する
 */
export function useLoadWallets(): ILoadWallets {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [wallets, setWallets] = useState<WalletModel[]>([]);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let unmounted = false;
    setIsLoading(true);
    setError(null);
    AccountController.getWalletList()
      .then((w) => {
        if (unmounted) return;
        setWallets([...w]);
      })
      .catch(() => {
        if (unmounted) return;
        setError(new StorageError('Failed to load Wallet.'));
      })
      .finally(() => {
        if (unmounted) return;
        setIsLoading(false);
      });
    return () => {
      unmounted = true;
    };
  }, []);

  return { isLoading, wallets, error };
}
