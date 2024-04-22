import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { View, Text } from 'react-native';

import ButtonBase from '@/components/atom/ButtonBase';
import { IconDown } from '@/components/atom/Icons';
import { List, ListItem } from '@/components/atom/List';
import { useTransactionHistory } from '@/hooks/useTransactionSearch';
import { getExplorerUrl } from '@/util/symbol/network';

interface Props {
  node: string | null;
  signerPublicKey: string;
}

export default function SendTransactionHistory(props: Props): JSX.Element {
  const router = useRouter();
  const { isLoading, error, next, refresh, transactions } = useTransactionHistory(props.node, 'confirmed', {
    order: 'desc',
    signerPublicKey: props.signerPublicKey,
    embedded: true,
  });

  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

  return (
    <List
      items={transactions}
      onRefresh={refresh}
      refreshing={isLoading}
      renderItem={(e) => (
        // TODO: 実際には useTransactionHistory が接続中 NODE の NetworkType 等を返却するべきであるため、Network 周りの実装が完了次第、以下も更新する
        <ButtonBase
          onPress={() => router.push(getExplorerUrl('mainnet', 'transactions', e.meta.hash || e.meta.aggregateHash))}
        >
          <ListItem className='flex-col items-start rounded-md border border-input'>
            <Text className='text-base font-semibold'>{e.transaction.type}</Text>
            {/* TODO: Network 情報を取得できるようになり次第、以下の実装を進める */}
            <Text>{new Date(Number(e.meta.timestamp) + 1615853185 * 1000).toLocaleString('ja')}</Text>
            <Text className='text-xs text-muted-foreground'>{e.meta.hash || e.meta.aggregateHash}</Text>
          </ListItem>
        </ButtonBase>
      )}
      ListFooterComponent={() =>
        !isLoading && !error && transactions.length !== 0 ? (
          <ButtonBase onPress={next} disabled={isLoading ?? error}>
            <View className='w-full flex flex-row gap-2 justify-center items-center py-12'>
              <IconDown isOutline={false} className='text-muted-foreground' />
              <Text className='text-base text-muted-foreground'>Load More...</Text>
            </View>
          </ButtonBase>
        ) : (
          <Text className='text-lg text-muted-foreground py-32 text-center'>No transaction history</Text>
        )
      }
    />
  );
}
