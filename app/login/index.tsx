import { Link } from 'expo-router';
import { View, Text, Button } from 'react-native';

import { AccountController } from '@/controller/AccountController';
import { SecureStorage } from '@/util/storages/SecureStorage';

export default function LoginRoot(): React.JSX.Element {
  return (
    <View className='flex-1 justify-center items-center gap-3'>
      <Text className='font-bold'>未ログイン時の最初のページ</Text>
      <Link href='/_sitemap' className='text-blue-700 underline'>
        to sitemap
      </Link>
      <Button title='検証用 WALLET 追加' onPress={() => AccountController.createNewPrivateKeyAccount('testnet')} />
      <Button title='検証用 WALLET 削除' onPress={() => new SecureStorage('ACCOUNT_SERVICE').resetSecretItem()} />
    </View>
  );
}
