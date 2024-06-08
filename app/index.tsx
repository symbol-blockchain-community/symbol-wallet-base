import { Link, useNavigation, useRouter } from 'expo-router';
import * as React from 'react';
import { View, Text } from 'react-native';

import Button from '@/components/atom/Button';
import ButtonBase from '@/components/atom/ButtonBase';
import { List } from '@/components/atom/List';
import { useLoadWallets } from '@/hooks/useLoadWallets';
import { WalletModel } from '@/models/AccountModel';
// FIXME import { AddressService } from '@/services/AddressService';
import { NotificationService } from '@/services/NotificationService';

function Item({ item }: { item: WalletModel }) {
  const router = useRouter();

  const onPressItem = () => {
    router.push(`/wallet/${item.publicKey}`);
  };

  return (
    <ButtonBase onPress={onPressItem} className='w-screen'>
      <View className='flex-col space-y-2 py-6 px-4 bg-background'>
        <Text className='text-xs text-muted-foreground absolute top-2 right-4'>{item.networkType}</Text>
        <Text className='text-xl font-semibold'>{item.name}</Text>
        <Text className='text-base'>
          {/* FIXME {AddressService.createFromPublicKey(item.publicKey, item.networkType).pretty()} */}
          AddressService.createFromPublicKey(item.publicKey, item.networkType).pretty()
        </Text>
        {/* TODO: 暫定で固定値挿入 */}
        <Text className='text-2xl text-right'>{(100000).toLocaleString('ja') + ' xym'}</Text>
      </View>
    </ButtonBase>
  );
}
export type TempType = {
  index: { id: number } | undefined;
};

export default function Root(): React.JSX.Element {
  const navigation = useNavigation();
  const { isLoading, wallets } = useLoadWallets();
  const [isWalletsInfoReload, setIsWalletsInfoReload] = React.useState<boolean>(false);

  React.useEffect(() => {
    const state = navigation.getState();
    navigation.reset({
      ...state,
      routes: state.routes.map((route) => ({ ...route, state: undefined })),
    });
  }, []);

  const testPushNotification = async () => {
    await new NotificationService().sendPushNotification('test', 'hello world', { key: 'test' });
  };

  const reloadAccountInfo = () => {
    setIsWalletsInfoReload(true);
    try {
      // TODO: 実際にはノードよりアドレスに紐づく残高情報を取得する
    } catch (err) {
      console.error(err);
    } finally {
      setIsWalletsInfoReload(false);
    }
  };

  return (
    <View className='flex-1 items-center py-2'>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <>
          <Link href='/_sitemap' className='text-blue-700 underline text-center py-10 text-lg'>
            開発用 - サイトマップへ
          </Link>
          <Button onPress={testPushNotification}>tset</Button>
          <List
            items={wallets}
            renderItem={(item) => <Item item={item} />}
            onRefresh={reloadAccountInfo}
            refreshing={isWalletsInfoReload}
          />
        </>
      )}
    </View>
  );
}
