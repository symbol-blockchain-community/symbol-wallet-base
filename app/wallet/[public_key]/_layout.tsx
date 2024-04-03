import { Link, Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { View } from 'react-native';

import { IconQRCode, IconReceipt } from '@/components/atom/Icons';
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
    <Stack initialRouteName='index'>
      <Stack.Screen
        name='index'
        initialParams={currentWallet}
        options={{
          headerTitle: currentWallet.name,
          headerRight: () => (
            <View className='flex flex-row gap-2'>
              <Link href={`/wallet/${currentWallet.publicKey}/transactions`} className='active:opacity-20 py-3 px-4'>
                <IconReceipt size={24} />
              </Link>
              <Link href={`/wallet/${currentWallet.publicKey}/account_qr`} className='active:opacity-20 py-3 px-4'>
                <IconQRCode size={24} />
              </Link>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name='transactions'
        initialParams={currentWallet}
        options={{
          headerTitle: t('pages.wallet.layout.transactions_tab_name'),
        }}
      />
      <Stack.Screen
        name='account_qr'
        initialParams={currentWallet}
        options={{ presentation: 'modal', headerTitle: 'QR' }}
      />
    </Stack>
  );
}
