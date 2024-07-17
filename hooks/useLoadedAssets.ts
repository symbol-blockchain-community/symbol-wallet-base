import Ionicons from '@expo/vector-icons/Ionicons';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';

import { AccountController } from '@/controller/AccountController';
import { NetworkController } from '@/controller/NetworkController';

export function useLoadedAssets() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  const [isWalletEmpty, setIsWalletEmpty] = useState(false);

  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        // アセットの順次読み込み
        await Font.loadAsync(Ionicons.font);

        // --- Network Storage の初期値有無検証と書き込み ---
        // 起動時に NetworkType が未選択である場合は、mainnet をデフォルト値として追加する
        // 接続先ノードが未選択である場合は、ランダムなノードを選出して追加する（ノード接続不可の際には別途 Modal を表示し、ノードを切り替えるかユーザーへ確認する ※ 圏外等の問題を考慮する為）
        // ノード接続不能時の Modal 表示は各 Stack 側に委ねる（自身の QRコード表示等、接続不要の機能で都度確認する必要は無い為）
        await NetworkController.initCheck();

        // --- Account Storage の初期値有無検証とリダイレクト ---
        // 起動時にストレージが存在しない場合はフラグをセット
        console.debug('useLoadedAssets called!');
        await AccountController.getWalletList()
          .then((wallets) => {
            setIsWalletEmpty(wallets?.length === 0);
          })
          .catch(() => {
            setIsWalletEmpty(true);
          });
      } catch (e) {
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return { isLoadingComplete, isWalletEmpty };
}
