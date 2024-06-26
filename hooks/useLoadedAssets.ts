import Ionicons from '@expo/vector-icons/Ionicons';
import * as Font from 'expo-font';
// import { router } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';

import { NetworkController } from '@/controller/NetworkController';

// import { AccountController } from '@/controller/AccountController';

export function useLoadedAssets(): boolean {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

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
        // 起動時にストレージが存在しない場合はログインページへ遷移する
        // TODO: 開発終了時に以下はコメント解除する
        // await AccountController.getWalletList()
        //   .then((wallets) => (!wallets || wallets.length === 0) && router.replace('login'))
        //   .catch(() => router.replace('login'));
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
