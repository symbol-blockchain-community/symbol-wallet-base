import * as Clipboard from 'expo-clipboard';
import { Link, useLocalSearchParams } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

import ButtonBase from '@/components/atom/ButtonBase';
import { Card } from '@/components/atom/Card';
import { WalletModel } from '@/models/AccountModel';
// FIXME import { AddressService } from '@/services/AddressService';
// import { getExplorerUrl } from '@/util/symbol/network';

/**
 * Wallet の Account QR を表示する
 */
export default function WalletsAccountQR(): JSX.Element {
  const params = useLocalSearchParams() as unknown as WalletModel;
  // FIXME const address = AddressService.createFromPublicKey(params.publicKey, params.networkType);
  // const address = null;
  // FIXME const explorerURL: string = getExplorerUrl(params.networkType, 'accounts', address.plain());
  const explorerURL: string = '';

  const copyHandle = () => {
    // FIXME Clipboard.setStringAsync(address.plain()).then(() => Toast.show({ text1: 'Copied' }));
    Clipboard.setStringAsync('').then(() => Toast.show({ text1: 'Copied' }));
  };

  return (
    <ScrollView className='flex-1'>
      <View className='flex flex-col items-center px-4 py-3 space-y-4'>
        <Card className='flex justify-center items-center w-full aspect-square'>
          <Text className=''>ここにでかでかとQRコード表示</Text>
        </Card>
        <View className='w-full'>
          <Text className='text-base font-semibold'>Explorer</Text>
          <Link className='text-sm text-muted-foreground underline' href={explorerURL}>
            {explorerURL}
          </Link>
        </View>
        <View className='w-full'>
          <ButtonBase onPress={copyHandle}>
            <Text className='text-base font-semibold'>Address</Text>
            {/* FIXME <Text className='text-sm text-muted-foreground'>{address.pretty()}</Text> */}
            <Text className='text-sm text-muted-foreground'>--</Text>
          </ButtonBase>
        </View>
        <View className='w-full'>
          <ButtonBase onPress={copyHandle}>
            <Text className='text-base font-semibold'>PublicKey</Text>
            <Text className='text-sm text-muted-foreground'>{params.publicKey}</Text>
          </ButtonBase>
        </View>
        <View className='w-full'>
          <ButtonBase onPress={copyHandle}>
            <Text className='text-base font-semibold'>Network</Text>
            <Text className='text-sm text-muted-foreground'>{params.networkType}</Text>
          </ButtonBase>
        </View>
      </View>
    </ScrollView>
  );
}
