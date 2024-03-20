import { cva, type VariantProps } from 'class-variance-authority';
import { CameraView, useCameraPermissions, BarcodeScanningResult } from 'expo-camera/next';
import * as React from 'react';
import { Pressable, View } from 'react-native';

import Button from '@/components/atom/Button';
import { IconLightDown, IconLightUp, IconCameraReverse } from '@/components/atom/Icons';
import { cn } from '@/util/classes';

const containerVariants = cva('rounded-full overflow-hidden', {
  variants: {
    size: {
      default: 'w-10 h-10',
      sm: 'w-8 h-8',
      md: 'w-12 h-12',
      lg: 'w-16 h-16',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

interface Props extends VariantProps<typeof containerVariants> {
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

  React.useEffect(() => {
    if (permission && permission.granted) {
      return;
    }
    requestPermission();
    return () => {
      setOpen(false);
    };
  }, []);

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
    <View>
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
        {!disableTourchSwitcher && (
          <Pressable onPress={toggleTorch} className='inline-flex px-3'>
            {enableTorch ? <IconLightDown size={32} /> : <IconLightUp size={32} />}
          </Pressable>
        )}
        {!disableFacingSwitcher && (
          <Pressable onPress={toggleCameraFacing} className='inline-flex px-3'>
            <IconCameraReverse size={32} />
          </Pressable>
        )}
        <Button variant='default' onPress={() => setOpen(false)} className='flex-1 '>
          キャンセル
        </Button>
      </View>
    </View>
  );
}
