import { useState, useEffect } from 'react';

// FIXME import { AccountController } from '@/controller/AccountController';
import { WalletModel } from '@/models/AccountModel';
import { StorageError } from '@/models/ErrorModels';

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
    // FIXME AccountController.getWalletList()
    //   .then((w) => {
    //     if (unmounted) return;
    //     setWallets([...w]);
    //   })
    //   .catch(() => {
    //     if (unmounted) return;
    //     setError(new StorageError('Failed to load Wallet.'));
    //   })
    //   .finally(() => {
    //     if (unmounted) return;
    //     setIsLoading(false);
    //   });
    // FIXME
    setWallets([]);
    setIsLoading(false);
    return () => {
      unmounted = true;
    };
  }, []);

  return { isLoading, wallets, error };
}
