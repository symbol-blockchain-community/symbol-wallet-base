import * as Clipboard from 'expo-clipboard';
import { writeAsStringAsync, deleteAsync, documentDirectory } from 'expo-file-system';
import { useRouter } from 'expo-router';
import * as Sharing from 'expo-sharing';
import { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import Toast from 'react-native-toast-message';

import Avatar from '@/components/atom/Avatar';
import Button from '@/components/atom/Button';
import { IconCopy } from '@/components/atom/Icons';
import TextArea from '@/components/atom/Textarea';
import { useI18n } from '@/hooks/useI18n';

export default function LoginGenerate(): React.JSX.Element {
  const { t } = useI18n();
  const router = useRouter();
  const [checked, setChecked] = useState<boolean>(false);
  const [mnemonic, setMnemonic] = useState<string>('');

  const handleSubmit = () => {
    if (checked && mnemonic) {
      router.push('/login/complete');
    } else {
      const tempFilePath = `${documentDirectory}mnemonic.txt`;
      // TODO: テキストファイルではなく、 QR 付き pdf を生成する
      writeAsStringAsync(tempFilePath, mnemonic)
        .then(() => Sharing.shareAsync(tempFilePath))
        .then(() => deleteAsync(tempFilePath));
      setChecked(true);
    }
  };

  const handleCopy = async () => {
    await Clipboard.setStringAsync(mnemonic);
    Toast.show({ text1: t('common.copied') });
  };

  useEffect(() => {
    if (!mnemonic) {
      // TODO: ニーモニックを作成し Secure Storage へ格納する
      setMnemonic(new Array(24).fill('test').join(' '));
    }
  }, []);

  return (
    <View className='flex-1 flex flex-col flex-grow justify-between items-center gap-3 px-6 py-24'>
      <View className='flex flex-col items-center'>
        <Avatar source={require('@/assets/icon.png')} size='lg' />
      </View>
      <View className='py-12'>
        <Text className='text-base'>{t('login.generated.title')}</Text>
      </View>
      <View className='flex flex-grow flex-col justify-start space-y-8 w-full max-w-sm'>
        <View>
          <Text className='pb-2'>{t('login.generated.input_label')}</Text>
          <View className='relative w-full'>
            <Button className='absolute right-2 top-2' variant='ghost' size='icon' onPress={handleCopy}>
              <IconCopy size={20} />
            </Button>
            <TextArea readOnly value={mnemonic} className='text-lg tracking-wider p-8 text-primary' />
          </View>
        </View>
        <Text>{t('login.new.precautions2_content')}</Text>
      </View>
      <Button variant='default' className='w-full max-w-sm' onPress={handleSubmit}>
        {checked ? t('common.next') : t('login.generated.save')}
      </Button>
    </View>
  );
}
