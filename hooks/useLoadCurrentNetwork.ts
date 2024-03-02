import { useEffect, useState } from 'react';

import { NetworkController } from '@/controller/NetworkController';
import { NetworkInfo } from '@/models/NetworkModels';

type ILoadCurrentNetwork = {
  isLoading: boolean;
  network: NetworkInfo | null;
  error: Error | null;
};
/**
 * ローカルストレージより現在のネットワーク設定値を取得する
 */
export function useLoadCurrentNetwork(): ILoadCurrentNetwork {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [network, setNetwork] = useState<NetworkInfo | null>(null);

  useEffect(() => {
    let unmounted = false;
    setIsLoading(true);
    setError(null);
    NetworkController.getCurrentSettings()
      .then((settings) => {
        if (unmounted) return;
        setNetwork(settings);
      })
      .catch((err) => {
        if (unmounted) return;
        setError(err);
        setNetwork(null);
      })
      .finally(() => setIsLoading(false));
    return () => {
      unmounted = true;
    };
  }, []);

  return { isLoading, network, error };
}
