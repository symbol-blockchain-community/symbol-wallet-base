import { Link } from 'expo-router';
import * as React from 'react';
import { View, Text, ScrollView } from 'react-native';

import Button from '@/components/atom/Button';
import QRCodeReader from '@/components/molecules/QRCodeReader';

export default function Root(): React.JSX.Element {
  const [open, setOpen] = React.useState(false);
  const [qrValue, setQrValue] = React.useState('');

  const showCamera = () => {
    setOpen(true);
  };

  return (
    <View className='flex-1 p-1'>
      <ScrollView>
        <View>
          <Text className='font-bold'>このスクリーンはカメラを使ってQRコードをスキャンする機能のサンプルです。</Text>
          <Text>※シミュレータ非対応</Text>
        </View>

        {open && (
          <View className='mt-5 mb-10'>
            <QRCodeReader open={open} setOpen={setOpen} onRead={(data) => setQrValue(data)} />
          </View>
        )}

        {!open && (
          <View className=''>
            <Button variant='default' onPress={showCamera}>
              カメラを起動
            </Button>
          </View>
        )}

        <View className='text-bold my-10'>
          <Text className='text-bold'>読み取り結果</Text>
          <Text>{qrValue}</Text>
        </View>
        <Link href='/_sitemap' className='text-blue-700 underline'>
          to sitemap
        </Link>
      </ScrollView>
    </View>
  );
}
