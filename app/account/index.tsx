import { Link } from 'expo-router';
import { View, Text } from 'react-native';

export default function AccountsRoot(): JSX.Element {
  return (
    <View className='flex-1 justify-center items-center gap-3'>
      <Text className='font-bold'>アカウント情報や各設定へのリンク</Text>
      <Link href='/_sitemap' className='text-blue-700 underline'>
        to sitemap
      </Link>
    </View>
  );
}
