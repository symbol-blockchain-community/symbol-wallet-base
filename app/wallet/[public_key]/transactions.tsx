import * as Clipboard from 'expo-clipboard';
import { useLocalSearchParams } from 'expo-router';
import { View } from 'react-native';
import Toast from 'react-native-toast-message';

import Tabs from '@/components/atom/Tabs';
import ReceievedTransactionHistory from '@/components/organisms/ReceievedTransactionHistory';
import SendTransactionHistory from '@/components/organisms/SendTransactionHistory';
import { useI18n } from '@/hooks/useI18n';
import { useLoadCurrentNetwork } from '@/hooks/useLoadCurrentNetwork';
import { WalletModel } from '@/models/AccountModel';
import { AddressService } from '@/services/AddressService';

export default function WalletAccountTransactions(): JSX.Element {
  const { t } = useI18n();
  const params = useLocalSearchParams() as unknown as WalletModel;
  const address = AddressService.createFromPublicKey(params.publicKey, params.networkType);
  const { isLoading, error, network } = useLoadCurrentNetwork();

  const copyAddress = () => {
    Clipboard.setStringAsync(address.plain()).then(() => Toast.show({ text1: t('common.copied') }));
  };

  if (error) throw error;

  return (
    <View className='flex-1 px-3 pt-4 bg-background'>
      <Tabs
        defaultTab='受信'
        tabs={[
          // { name: '受信', content: <ReceievedTransactionHistory recipientAddress={address.plain()} /> },
          {
            name: '受信',
            content: (
              <ReceievedTransactionHistory
                node={isLoading || !network?.network.restGatewayUrl ? null : network.network.restGatewayUrl}
                recipientAddress='TAILJXZJA3JQZ5YN7DUAWS7M4K7RT7UX275PQRI'
              />
            ),
          },
          // { name: '送信', content: <SendTransactionHistory signerPublicKey={params.publicKey} /> },
          {
            name: '送信',
            content: (
              <SendTransactionHistory
                node={isLoading || !network?.network.restGatewayUrl ? null : network.network.restGatewayUrl}
                signerPublicKey='E959F11B571C3DC2EB4FA82107A4878989E528D3D82320E5C9DC890763F502E4'
              />
            ),
          },
          { name: '署名中', content: <View /> },
          { name: '収穫', content: <View /> },
        ]}
      />
    </View>
  );
}
