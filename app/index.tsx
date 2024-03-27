import { Link } from 'expo-router';
import * as React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ButtonBase from '@/components/atom/ButtonBase';
import { List } from '@/components/atom/List';
import { useLoadWallets } from '@/hooks/useLoadWallets';
import { WalletModel } from '@/models/AccountModel';
import { AddressService } from '@/services/AddressService';

function Item({ item }: { item: WalletModel }) {
  // const router = useRouter();

  /** 選択されたアカウントの詳細ページを開く */
  const onPressItem = () => {
    // TODO: 今後のブランチより対応
    // router.push('/wallet/');
  };

  return (
    <ButtonBase onPress={onPressItem} className='w-screen'>
      <View className='flex-col space-y-2 py-6 px-4 bg-background'>
        <Text className='text-xs text-muted-foreground absolute top-2 right-4'>{item.networkType}</Text>
        <Text className='text-xl font-semibold'>{item.name}</Text>
        <Text className='text-base'>
          {AddressService.createFromPublicKey(item.publicKey, item.networkType).pretty()}
        </Text>
        {/* TODO: 暫定で固定値挿入 */}
        <Text className='text-2xl text-right'>{(100000).toLocaleString('ja') + ' xym'}</Text>
      </View>
    </ButtonBase>
  );
}

export default function Root(): React.JSX.Element {
  const { isLoading, wallets, error } = useLoadWallets();
  console.log(isLoading, wallets, error);

  // TODO: Error バウンダリ

  return (
    <View className='flex-1 items-center py-2'>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <>
          <Link href='/_sitemap' className='text-blue-700 underline text-center'>
            開発用 - サイトマップへ
          </Link>
          <List
            items={wallets}
            renderItem={(item) => <Item item={item} />}
            ListFooterComponent={() => <SafeAreaView edges={['bottom']} />}
          />
        </>
      )}
    </View>
  );
}
