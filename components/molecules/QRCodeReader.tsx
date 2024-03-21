import { CameraView, useCameraPermissions, BarcodeScanningResult } from 'expo-camera/next';
import * as React from 'react';
import { Pressable, View, Text, Linking } from 'react-native';

import Button from '@/components/atom/Button';
import { IconLightDown, IconLightUp, IconCameraReverse } from '@/components/atom/Icons';
import { cn } from '@/util/classes';

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  onRead: (result: string) => void;
  disableFacingSwitcher?: boolean;
  disableTourchSwitcher?: boolean;
}

export default function QRCodeReader({
  open,
  setOpen,
  onRead,
  disableFacingSwitcher = false,
  disableTourchSwitcher = false,
  ...props
}: Props): JSX.Element {
  const [facing, setFacing] = React.useState<'back' | 'front'>('back');
  const [enableTorch, setEnableTorch] = React.useState(false);
  const [permission, requestPermission] = useCameraPermissions();

  function handlePressRequestPermission() {
    requestPermission();
  }

  function handleBarcodeScanned(result: BarcodeScanningResult) {
    setOpen(false);
    onRead(result.data);
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === 'back' ? 'front' : 'back'));
  }

  function toggleTorch() {
    setEnableTorch((current) => !current);
  }

  if (!open) return <></>;

  return (
    <View {...props}>
      {permission && permission.status === 'undetermined' && (
        <>
          <Button variant='default' onPress={handlePressRequestPermission} className=''>
            カメラを有効化
          </Button>
        </>
      )}
      {permission && permission.status === 'denied' && (
        <View className={cn('w-full my-4 rounded-lg')}>
          <Text>カメラが無効になっています。設定画面よりカメラの使用を許可して下さい。</Text>
          <Button variant='default' onPress={() => Linking.openSettings()} className=''>
            設定を開く
          </Button>
        </View>
      )}
      {permission && permission.status === 'granted' && (
        <>
          <CameraView
            facing={facing}
            barcodeScannerSettings={{
              // @see https://docs.expo.dev/versions/latest/sdk/camera-next/#barcodesettings
              barcodeTypes: ['qr'],
              interval: 500, // FIXME 効かない
            }}
            enableTorch={enableTorch}
            onBarcodeScanned={handleBarcodeScanned}
          >
            <View className={cn('w-11/12 max-w-5xl my-4 h-screen h-5/6 rounded-lg')} />
          </CameraView>
          <View className='mt-5 flex flex-row justify-between'>
            {/* ライトOn/Offボタン */}
            {!disableTourchSwitcher && (
              <Pressable onPress={toggleTorch} className='inline-flex px-3'>
                {enableTorch ? <IconLightDown size={32} /> : <IconLightUp size={32} />}
              </Pressable>
            )}
            {/* カメラ切り替え */}
            {!disableFacingSwitcher && (
              <Pressable onPress={toggleCameraFacing} className='inline-flex px-3'>
                <IconCameraReverse size={32} />
              </Pressable>
            )}
            <Button variant='default' onPress={() => setOpen(false)} className='flex-1 '>
              キャンセル
            </Button>
          </View>
        </>
      )}
    </View>
  );
}
