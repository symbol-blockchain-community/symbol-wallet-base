import * as Clipboard from 'expo-clipboard';
import { Link, useLocalSearchParams } from 'expo-router';
import { View, Text, Pressable } from 'react-native';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

import { Card, CardFooter, CardHeader } from '@/components/atom/Card';
import { useI18n } from '@/hooks/useI18n';
import { WalletModel } from '@/models/AccountModel';
import { AddressService } from '@/services/AddressService';

export default function WalletAccountDetail(): JSX.Element {
  const { t } = useI18n();
  const params = useLocalSearchParams() as unknown as WalletModel;
  const address = AddressService.createFromPublicKey(params.publicKey, params.networkType);

  const copyAddress = () => {
    Clipboard.setStringAsync(address.plain()).then(() => Toast.show({ text1: t('common.copied') }));
  };

  return (
    <View className='flex-1 items-center gap-3 px-4 pt-3'>
      <Card className='w-full p-4' color='default'>
        <Text className='text-sm text-right text-muted-foreground'>{params.networkType}</Text>
        <Pressable onLongPress={copyAddress}>
          {({ pressed }) => <CardHeader className={pressed ? 'opacity-20' : undefined}>{address.pretty()}</CardHeader>}
        </Pressable>
        <CardFooter>
          <Text className='text-2xl'>{(100000000000).toLocaleString('ja')} xym</Text>
        </CardFooter>
      </Card>
    </View>
  );
}
