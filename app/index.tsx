import { Link } from 'expo-router';
import * as React from 'react';
import { View, Text } from 'react-native';

export default function Root(): React.JSX.Element {
  return (
    <View className='flex-1 justify-center items-center gap-y-3 p-2 bg-background'>
      <Text className='font-bold'>wallet 一覧と情報の表示</Text>
      <Text>未ログイン時は /login へリダイレクト</Text>
      <Text>詳細 Navigation は Drawer で</Text>
      <Link href='/_sitemap' className='text-blue-700 underline'>
        to sitemap
      </Link>
    </View>
  );
}
