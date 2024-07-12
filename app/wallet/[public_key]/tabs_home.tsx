import * as Clipboard from 'expo-clipboard';
import { useLocalSearchParams } from 'expo-router';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

import { Card, CardFooter, CardHeader } from '@/components/atom/Card';
import FormattedAmount from '@/components/atom/FormattedAmount';
import { useGetCurrentBalance } from '@/hooks/useGetCurrentBalance';
import { useI18n } from '@/hooks/useI18n';
import { useLoadCurrentNetwork } from '@/hooks/useLoadCurrentNetwork';
import { WalletModel } from '@/models/AccountModel';
import { AddressService } from '@/services/AddressService';

function useHooks() {
  const loadNetworks = useLoadCurrentNetwork();

  return {
    connection: loadNetworks.network?.connection,
    restGateway: loadNetworks.network?.network.restGatewayUrl,
    networkType: loadNetworks.network?.network.networkType,
  };
}

export default function WalletAccountDetail(): JSX.Element {
  const { t } = useI18n();
  const params = useLocalSearchParams() as unknown as WalletModel;
  const { restGateway } = useHooks();

  const address = AddressService.createFromPublicKey(params.publicKey, params.networkType);
  const { isLoading, balance, mosaics } = useGetCurrentBalance(address.plain(), restGateway || null);
  const copyAddress = () => {
    Clipboard.setStringAsync(address.plain()).then(() => Toast.show({ text1: t('common.copied') }));
  };

  return (
    <>
      <View className='flex-1 items-center gap-3 pt-3'>
        <ScrollView>
          <Card className='w-full p-4 mb-2' color='default'>
            <Text className='text-sm text-right text-muted-foreground'>{params.networkType}</Text>
            <Pressable onLongPress={copyAddress}>
              {({ pressed }) => (
                <CardHeader className={pressed ? 'opacity-20' : undefined} style={{ minWidth: '90%' }}>
                  {address?.pretty()}
                </CardHeader>
              )}
            </Pressable>
            <CardFooter>
              {isLoading && <Text className='text-sm text-muted-foreground'>Loading...</Text>}
              {!isLoading && <Text className='text-2xl'>{balance.toLocaleString('ja')} xym</Text>}
            </CardFooter>
          </Card>

          <Text className='text-xl my-4'>{t('pages.wallet.tabsHome.owned_mosaics')}</Text>

          {mosaics.map((mosaic) => {
            return (
              <Card className='w-full p-4' color='default' key={mosaic.id}>
                <CardHeader>{mosaic.namespace ?? mosaic.id}</CardHeader>
                <CardFooter>
                  <FormattedAmount amount={mosaic.amount} className='text-2xl' />
                </CardFooter>
              </Card>
            );
          })}
        </ScrollView>
      </View>
    </>
  );
}
