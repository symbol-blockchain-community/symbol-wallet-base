import { useRouter } from 'expo-router';
import { useEffect, useMemo } from 'react';
import { View, Text } from 'react-native';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

import ButtonBase from '@/components/atom/ButtonBase';
import { IconDown } from '@/components/atom/Icons';
import { List, ListItem } from '@/components/atom/List';
import { useI18n } from '@/hooks/useI18n';
import { useTransactionHistory } from '@/hooks/useTransactionSearch';
import { NetworkType } from '@/models/NetworkModels';
import { NETWORK_PROPERTIES } from '@/util/configs/network-properties';
import { getExplorerUrl } from '@/util/symbol/network';

interface Props {
  node: string | null;
  recipientAddress: string;
  networkType: NetworkType;
}

export default function ReceivedTransactionHistory(props: Props): JSX.Element {
  const router = useRouter();
  const { t } = useI18n();
  const { isLoading, error, next, refresh, transactions } = useTransactionHistory(props.node, 'confirmed', {
    order: 'desc',
    recipientAddress: props.recipientAddress,
    embedded: true,
  });

  const epochAdjustment = useMemo(() => {
    return NETWORK_PROPERTIES[props.networkType || 'mainnet'].epochAdjustment;
  }, [props.networkType]);

  useEffect(() => {
    if (error) {
      Toast.show({
        text1: error.message,
        type: 'error',
      });
      console.error(error);
    }
  }, [error]);

  return (
    <List
      items={transactions}
      onRefresh={refresh}
      refreshing={isLoading}
      renderItem={(e) => (
        <ButtonBase
          onPress={() =>
            router.push(getExplorerUrl(props.networkType, 'transactions', e.meta.hash || e.meta.aggregateHash))
          }
        >
          <ListItem className='flex-col items-start rounded-md border border-input'>
            <Text className='text-base font-semibold'>
              {new Date(Number(e.meta.timestamp) + epochAdjustment * 1000).toLocaleString('ja')}
            </Text>
            <Text>{e.meta.hash || e.meta.aggregateHash}</Text>
            <Text className='text-xs text-muted-foreground'>{e.meta.height} block</Text>
          </ListItem>
        </ButtonBase>
      )}
      ListFooterComponent={() =>
        !isLoading && !error && transactions.length !== 0 ? (
          <ButtonBase onPress={next} disabled={isLoading ?? error}>
            <View className='w-full flex flex-row gap-2 justify-center items-center py-12'>
              <IconDown isOutline={false} className='text-muted-foreground' />
              <Text className='text-base text-muted-foreground'>{t('common.loadMore')}</Text>
            </View>
          </ButtonBase>
        ) : (
          <Text className='text-lg text-muted-foreground py-32 text-center'>
            {t('organisms.ReceivedTransactionHistory.noTransactionHistory')}
          </Text>
        )
      }
    />
  );
}
