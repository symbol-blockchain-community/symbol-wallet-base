import Ionicons from '@expo/vector-icons/Ionicons';
import * as Font from 'expo-font';
import { router } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';

import { AccountController } from '@/controller/AccountController';

export function useLoadedAssets(): boolean {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        // アセットの順次読み込み
        await Font.loadAsync(Ionicons.font);

        // 起動時にストレージが存在しない場合はログインページへ遷移
        await AccountController.getWalletList()
          .then((wallets) => (!wallets || wallets.length === 0) && router.replace('login'))
          .catch(() => router.replace('login'));
      } catch (e) {
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
