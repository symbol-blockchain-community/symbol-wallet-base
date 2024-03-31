import { useRouter } from 'expo-router';
import { reloadAsync } from 'expo-updates';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ButtonBase from '@/components/atom/ButtonBase';
import { IconDown } from '@/components/atom/Icons';
import { List, ListItem } from '@/components/atom/List';
import { NetworkController } from '@/controller/NetworkController';
import { useGetNodeList } from '@/hooks/useGetNodeList';
import { useLoadCurrentNetwork } from '@/hooks/useLoadCurrentNetwork';
import { ConnectionError, StorageError } from '@/models/ErrorModels';
import { cn } from '@/util/classes';

// 手入力へも対応する

export default function SelectNetworkNodePage(): JSX.Element {
  const router = useRouter();
  const [updating, setUpdating] = useState(false);
  const currentNetwork = useLoadCurrentNetwork();
  const nodeList = useGetNodeList(currentNetwork.network?.network.networkType || null);

  if (currentNetwork.error) {
    throw new StorageError(`SelectNetworkNodePage: Failed to load network configuration, ${currentNetwork.error}`);
  }
  if (nodeList.error) {
    throw new ConnectionError(`SelectNetworkNodePage: Failed to load node list, ${nodeList.error}`);
  }

  const handleSubmit = async (restGatewayUrl: string) => {
    if (currentNetwork.network?.network.networkType) {
      try {
        setUpdating(true);
        await NetworkController.setSettings(currentNetwork.network.network.networkType, { restGatewayUrl });
        await reloadAsync();
      } catch (err) {
        console.error(`SelectNetworkNodePage: ${err}`);
      } finally {
        setUpdating(false);
      }
    }
  };

  /** 手入力によるノードの追加 */
  const handleInputStartCustomNode = async () => {
    router.push('/account/network_node_custom');
  };

  return (
    <View className='flex-1 px-4 pt-6'>
      <View className='pb-4 flex flex-col space-y-2'>
        <Text className='text-base'>接続したいノードを選択してください</Text>
        <Text numberOfLines={1}>{`接続中ノード: ${currentNetwork.network?.network.restGatewayUrl || 'unknown'}`}</Text>
      </View>
      <List
        items={[{ id: 'custom' } as any, ...nodeList.nodeList.map((e, i) => ({ ...e, id: i }))]}
        renderItem={(item) => {
          if (item.id === 'custom') {
            return (
              <Pressable onPress={() => handleInputStartCustomNode()}>
                {({ pressed }) => (
                  <ListItem className={cn(pressed ? 'opacity-20' : undefined, 'rounded-md border border-input w-full')}>
                    <View className='flex justify-center items-center w-full'>
                      <Text className='text-base font-semibold py-1 text-center'>手入力する</Text>
                    </View>
                  </ListItem>
                )}
              </Pressable>
            );
          } else {
            return (
              <Pressable onPress={() => handleSubmit(item.restGatewayUrl)}>
                {({ pressed }) => (
                  <ListItem
                    className={cn(
                      pressed ? 'opacity-20' : undefined,
                      'flex flex-row space-x-4 rounded-md border border-input'
                    )}
                  >
                    <View>
                      <Text numberOfLines={1} className='text-base font-semibold'>
                        {item.friendlyName}
                      </Text>
                      <Text numberOfLines={1}>{item.restGatewayUrl}</Text>
                    </View>
                  </ListItem>
                )}
              </Pressable>
            );
          }
        }}
        onRefresh={async () => await nodeList.refresh()}
        refreshing={updating || currentNetwork.isLoading || nodeList.isLoading}
        ListFooterComponent={() => (
          <SafeAreaView edges={['bottom']}>
            {!nodeList.isLoading && !nodeList.error && nodeList.nodeList.length !== 0 ? (
              <ButtonBase onPress={nodeList.next} disabled={nodeList.isLoading ?? nodeList.error}>
                <View className='w-full flex flex-row gap-2 justify-center items-center py-12'>
                  <IconDown isOutline={false} className='text-muted-foreground' />
                  <Text className='text-base text-muted-foreground'>Load More...</Text>
                </View>
              </ButtonBase>
            ) : (
              <Text className='text-lg text-muted-foreground py-32 text-center'>No Node List</Text>
            )}
          </SafeAreaView>
        )}
      />
    </View>
  );
}
