import { Link } from 'expo-router';
import { View, Text } from 'react-native';

export default function WalletRoot(): JSX.Element {
  return (
    <View className='flex-1 justify-center items-center gap-3'>
      <Text className='font-bold'>各 wallet の詳細情報</Text>
      <Link href='/_sitemap' className='text-blue-700 underline'>
        to sitemap
      </Link>
    </View>
  );
}
