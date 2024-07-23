import { Link, useNavigation, useRouter } from 'expo-router';
import * as React from 'react';
import { View, Text } from 'react-native';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

import ButtonBase from '@/components/atom/ButtonBase';
import { List } from '@/components/atom/List';
import { useGetCurrentBalance } from '@/hooks/useGetCurrentBalance';
import { useLoadCurrentNetwork } from '@/hooks/useLoadCurrentNetwork';
import { useLoadWallets } from '@/hooks/useLoadWallets';
import { useLoadedAssets } from '@/hooks/useLoadedAssets';
import { WalletModel } from '@/models/AccountModel';
import { AddressService } from '@/services/AddressService';

function useHooks() {
  const loadWallets = useLoadWallets();
  const loadNetworks = useLoadCurrentNetwork();

  return {
    isLoading: loadWallets.isLoading || loadNetworks.isLoading,
    error: loadWallets.error || loadNetworks.error,
    wallets: loadWallets.wallets.filter((e) => e.networkType === loadNetworks.network?.network.networkType),
    connection: loadNetworks.network?.connection,
    restGateway: loadNetworks.network?.network.restGatewayUrl,
    networkType: loadNetworks.network?.network.networkType,
  };
}

function Item({
  item,
  node,
  onRefresh,
}: {
  item: WalletModel;
  node?: string;
  onRefresh: (refresh: () => Promise<void>) => void;
}) {
  const router = useRouter();
  const { isLoading, error, balance, refresh } = useGetCurrentBalance(
    AddressService.createFromPublicKey(item.publicKey, item.networkType).plain(),
    node || ''
  );
  const onPressItem = () => {
    router.push(`/wallet/${item.publicKey}`);
  };
  React.useEffect(() => {
    onRefresh(refresh);
  }, [refresh]);

  return (
    <ButtonBase onPress={onPressItem} className='w-screen'>
      <View className='flex-col space-y-2 py-6 px-4 bg-background'>
        <Text className='text-xs text-muted-foreground absolute top-2 right-4'>{item.networkType}</Text>
        <Text className='text-xl font-semibold'>{item.name}</Text>
        <Text className='text-base'>
          {AddressService.createFromPublicKey(item.publicKey, item.networkType).pretty()}
        </Text>
        {!isLoading && <Text className='text-2xl text-right'>{balance.toLocaleString('ja') + ' xym'}</Text>}
        {error && <Text className='text-red-500 text-right'>{error.message}</Text>}
      </View>
    </ButtonBase>
  );
}
export type TempType = {
  index: { id: number } | undefined;
};

export default function Root(): React.JSX.Element {
  const navigation = useNavigation();
  const router = useRouter();
  const [isWalletsInfoReload, setIsWalletsInfoReload] = React.useState<boolean>(false);
  const { isLoading, wallets, connection, restGateway } = useHooks();
  const refreshFunctions = React.useRef<(() => Promise<void>)[]>([]);

  React.useEffect(() => {
    const state = navigation.getState();
    navigation.reset({
      ...state,
      routes: state.routes.map((route) => ({ ...route, state: undefined })),
    });
  }, []);

  const reloadAccountInfo = async () => {
    if (connection === 'disconnected') {
      Toast.show({ type: 'error', text1: 'Node disconnected' });
      return;
    }
    setIsWalletsInfoReload(true);
    try {
      // 実際にはノードよりアドレスに紐づく残高情報を取得する
      await Promise.all(refreshFunctions.current.map((refresh) => refresh()));
    } catch (err) {
      console.error(err);
    } finally {
      setIsWalletsInfoReload(false);
    }
  };

  const handleRefresh = (refresh: () => Promise<void>) => {
    refreshFunctions.current.push(refresh);
  };

  return (
    <View className='flex-1 items-center py-2'>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <>
          <List
            items={wallets}
            renderItem={(item) => <Item item={item} node={restGateway} onRefresh={handleRefresh} />}
            onRefresh={reloadAccountInfo}
            refreshing={isWalletsInfoReload}
          />
          <Link href='/_sitemap' className='text-blue-700 underline text-center py-10 text-lg'>
            開発用 - サイトマップへ
          </Link>
        </>
      )}
    </View>
  );
}
