import * as Clipboard from 'expo-clipboard';
import { useLocalSearchParams } from 'expo-router';
import { View } from 'react-native';
import Toast from 'react-native-toast-message';

import Tabs from '@/components/atom/Tabs';
import ReceievedTransactionHistory from '@/components/organisms/ReceievedTransactionHistory';
import SendTransactionHistory from '@/components/organisms/SendTransactionHistory';
import { useI18n } from '@/hooks/useI18n';
import { WalletModel } from '@/models/AccountModel';
import { AddressService } from '@/services/AddressService';

export default function WalletAccountTransactions(): JSX.Element {
  const { t } = useI18n();
  const params = useLocalSearchParams() as unknown as WalletModel;
  const address = AddressService.createFromPublicKey(params.publicKey, params.networkType);

  const copyAddress = () => {
    Clipboard.setStringAsync(address.plain()).then(() => Toast.show({ text1: t('common.copied') }));
  };

  // 次ここから。各履歴ページを作るのではなく、Filter 条件を引数として持って、それぞれの内部で対応

  return (
    <View className='flex-1 px-3 pt-4 bg-background'>
      <Tabs
        defaultTab='受信'
        tabs={[
          // { name: '受信', content: <ReceievedTransactionHistory recipientAddress={address.plain()} /> },
          {
            name: '受信',
            content: <ReceievedTransactionHistory recipientAddress='NAXSH7VBPXFR6UEILARG46AXP4HTEJXZ5D44F4Q' />,
          },
          // { name: '送信', content: <SendTransactionHistory signerPublicKey={params.publicKey} /> },
          {
            name: '送信',
            content: (
              <SendTransactionHistory signerPublicKey='C1D4385CB20FD8D1E93F95DE7E64B22302E0978B1D1585DAA361C4CB02D241FC' />
            ),
          },
          { name: '署名中', content: <View /> },
          { name: '収穫', content: <View /> },
        ]}
      />
    </View>
  );
}
