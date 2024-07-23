import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

import Tabs from '@/components/atom/Tabs';
import ReceivedTransactionHistory from '@/components/organisms/ReceivedTransactionHistory';
import SendTransactionHistory from '@/components/organisms/SendTransactionHistory';
import { useI18n } from '@/hooks/useI18n';
import { useLoadCurrentNetwork } from '@/hooks/useLoadCurrentNetwork';
import { WalletModel } from '@/models/AccountModel';
import { AddressService } from '@/services/AddressService';

export default function WalletAccountTransactions(): JSX.Element {
  const { t } = useI18n();
  const params = useLocalSearchParams() as unknown as WalletModel;
  const { isLoading, error, network } = useLoadCurrentNetwork();

  if (error) throw error;

  return (
    <View className='flex-1 px-3 pt-4 bg-background'>
      {!isLoading && (
        <>
          <Tabs
            defaultTab={t('common.receive')}
            tabs={[
              {
                name: t('common.receive'),
                content: (
                  <ReceivedTransactionHistory
                    node={network?.network.restGatewayUrl || null}
                    networkType={network?.network.networkType || 'mainnet'}
                    recipientAddress={AddressService.createFromPublicKey(
                      params.publicKey,
                      network?.network.networkType!
                    ).plain()}
                  />
                ),
              },
              {
                name: t('common.send'),
                content: (
                  <SendTransactionHistory
                    node={network?.network.restGatewayUrl || null}
                    networkType={network?.network.networkType || 'mainnet'}
                    signerPublicKey={params.publicKey}
                  />
                ),
              },
              // TODO 後日実装
              // { name: '署名中', content: <View /> },
              // { name: '収穫', content: <View /> },
            ]}
          />
        </>
      )}
    </View>
  );
}
