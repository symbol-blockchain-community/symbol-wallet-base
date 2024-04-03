import { Link } from 'expo-router';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { IconNodes, IconServer } from '@/components/atom/Icons';
import { List, ListItem } from '@/components/atom/List';
import { useLoadCurrentNetwork } from '@/hooks/useLoadCurrentNetwork';
import { StorageError } from '@/models/ErrorModels';
import { cn } from '@/util/classes';

export default function NetworkPage(): JSX.Element {
  const { isLoading, error, network } = useLoadCurrentNetwork();

  if (error) {
    throw new StorageError('Failed to load network configuration');
  }

  return (
    <View className='pt-4'>
      <List
        items={[
          {
            id: 'type',
            icon: IconNodes,
            name: 'Network Type',
            currentValue: isLoading ? '...loading' : network?.network.networkType || 'unknown',
            path: '/account/network_type_select',
          },
          {
            id: 'node',
            icon: IconServer,
            name: 'Coneccting Node',
            currentValue: isLoading ? '...loading' : network?.network.restGatewayUrl || 'unknown',
            path: '/account/network_node_select',
          },
        ]}
        renderItem={(e) => (
          <Link href={e.path}>
            <ListItem className='space-x-4 px-6'>
              <e.icon />
              <View>
                <Text className='text-xl'>{e.name}</Text>
                <Text className='text-base' numberOfLines={1}>
                  {e.currentValue}
                </Text>
              </View>
            </ListItem>
          </Link>
        )}
        refreshing={isLoading}
        onRefresh={undefined}
        ListFooterComponent={() => (
          <SafeAreaView edges={['bottom']}>
            <View className='px-6 w-full'>
              <Text className='text-base text-center'>
                Node Health
                <Text
                  className={cn(
                    'text-base font-semibold',
                    network?.connection === 'connected' ? 'text-green-600' : 'text-error'
                  )}
                >
                  {isLoading ? '...loading' : '  ' + network?.connection || 'unknown'}
                </Text>
              </Text>
            </View>
          </SafeAreaView>
        )}
      />
    </View>
  );
}
