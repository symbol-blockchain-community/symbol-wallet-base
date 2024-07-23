import { useLocalSearchParams, useRouter, Tabs } from 'expo-router';
import { useEffect } from 'react';
import { View } from 'react-native';

import { IconReceipt, IconWallet } from '@/components/atom/Icons';
import { useI18n } from '@/hooks/useI18n';
import { useLoadWallets } from '@/hooks/useLoadWallets';

interface SearchParams {
  public_key: string;
  screen: string;
}

export default function WalletPublicKeyDynamicLayout(): JSX.Element {
  const router = useRouter();
  const { t } = useI18n();
  const params = useLocalSearchParams() as unknown as SearchParams;
  const { isLoading, wallets, error } = useLoadWallets();
  const currentWallet = wallets.find((wallet) => wallet.publicKey === params.public_key);

  useEffect(() => {
    // LocalStorage の読込中にエラーが発生した場合、ホーム画面へ戻る
    if (error) {
      console.error('Wallets Load Error', error);
      router.replace('/');
    }
    // 指定されたアカウントが存在しない場合、ホーム画面へ戻る
    if (!isLoading && !currentWallet) {
      console.log(`Wallet ${params.public_key} is not find`);
      router.replace('/');
    }
  }, [error, isLoading]);

  if (isLoading || !currentWallet) {
    return <View />;
  }

  return (
    <Tabs initialRouteName='tabs_home' screenOptions={{ tabBarActiveTintColor: 'blue' }}>
      <Tabs.Screen
        name='tabs_home'
        initialParams={currentWallet}
        options={{
          headerShown: false,
          tabBarIcon: () => <IconWallet size={20} className='text-primary' />,
          tabBarLabel: t('pages.wallet.layout.home_tab_name'),
        }}
      />
      <Tabs.Screen
        name='tabs_transactions'
        initialParams={currentWallet}
        options={{
          headerShown: false,
          headerTitle: t('pages.wallet.layout.transactions_tab_name'),
          tabBarIcon: () => <IconReceipt size={20} className='text-primary' />,
          tabBarLabel: t('pages.wallet.layout.transactions_tab_name'),
        }}
      />
      {/* TODO まだ表示しない */}
      <Tabs.Screen
        name='tabs_account_qr'
        initialParams={currentWallet}
        options={{
          headerShown: false,
          headerTitle: t('pages.wallet.layout.qr_tab_name'),
          href: null,
        }}
      />
    </Tabs>
  );
}
