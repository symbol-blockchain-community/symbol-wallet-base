import * as Clipboard from 'expo-clipboard';
import { writeAsStringAsync, deleteAsync, documentDirectory } from 'expo-file-system';
import { useRouter } from 'expo-router';
import * as Sharing from 'expo-sharing';
import { useState } from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

import Avatar from '@/components/atom/Avatar';
import Button from '@/components/atom/Button';
import { IconCopy, IconRefresh } from '@/components/atom/Icons';
import TextArea from '@/components/atom/Textarea';
import { useI18n } from '@/hooks/useI18n';
import { MnemonicService } from '@/services/MnemonicService';

export default function LoginGenerate(): React.JSX.Element {
  const { t } = useI18n();
  const router = useRouter();
  const [checked, setChecked] = useState<boolean>(false);
  const [mnemonicService, setMnemonicService] = useState<MnemonicService>(MnemonicService.createRandom());

  const handleSubmit = () => {
    if (checked && mnemonicService.mnemonic) {
      // SecureStorageに保存
      mnemonicService.replaceToStorage();
      // ウォレット選択画面に移動
      router.push('/login/imported');
    } else {
      const tempFilePath = `${documentDirectory}mnemonic.txt`;
      // TODO: テキストファイルではなく、 QR 付き pdf を生成する
      writeAsStringAsync(tempFilePath, mnemonicService.mnemonic)
        .then(() => Sharing.shareAsync(tempFilePath))
        .then(() => deleteAsync(tempFilePath))
        .catch((error) => console.error(error));
      setChecked(true);
    }
  };

  const handleCopy = async () => {
    await Clipboard.setStringAsync(mnemonicService.mnemonic);
    Toast.show({ text1: t('common.copied') });
  };

  const handleRefresh = () => {
    setMnemonicService(MnemonicService.createRandom());
  };

  return (
    <SafeAreaView className='flex-1 flex flex-col items-center p-6'>
      <View className='flex flex-col items-center'>
        <Avatar source={require('@/assets/icon.png')} size='lg' />
      </View>
      <View className='py-6'>
        <Text className='text-base'>{t('pages.login.generated.title')}</Text>
      </View>
      <View className='flex flex-col justify-start w-full max-w-sm'>
        <Text className='pb-2'>{t('pages.login.generated.input_label')}</Text>
        <View className='relative w-full'>
          <View className='absolute right-2 top-2 z-10 flex flex-row space-x-1'>
            <Button variant='ghost' size='icon' onPress={handleCopy}>
              <IconCopy size={20} />
            </Button>
            <Button variant='ghost' size='icon' onPress={handleRefresh}>
              <IconRefresh size={20} />
            </Button>
          </View>
          <TextArea readOnly value={mnemonicService.mnemonic} className='text-lg tracking-wider p-8 text-primary' />
        </View>
      </View>
      <Button variant='default' className='w-full max-w-sm mt-auto' onPress={handleSubmit}>
        {checked ? t('common.next') : t('pages.login.generated.save')}
      </Button>
    </SafeAreaView>
  );
}
