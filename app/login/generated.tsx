import { writeAsStringAsync, deleteAsync, documentDirectory } from 'expo-file-system';
import { useRouter } from 'expo-router';
import * as Sharing from 'expo-sharing';
import { useState } from 'react';
import { View, Text, Pressable } from 'react-native';

import Avatar from '@/components/atom/Avatar';
import Button from '@/components/atom/Button';
import Checkbox from '@/components/atom/Checkbox';
import TextArea from '@/components/atom/Textarea';
import { useI18n } from '@/hooks/useI18n';
import useUpdateEffect from '@/hooks/useUpdateEffect';

export default function LoginGenerate(): React.JSX.Element {
  const { t } = useI18n();
  const router = useRouter();
  const [checked, setChecked] = useState<boolean>(false);
  const [mnemonic, setMnemonic] = useState<string>('');

  const handleSubmit = () => {
    if (checked && mnemonic) {
      router.push('/login/generated');
    }

    if (!checked) {
      setMnemonic('');
    }
  };

  useUpdateEffect(() => {
    if (mnemonic) {
      // 作成されたニーモニックを任意の場所へ保存する
      console.log('mnemonic created');
      const tempFilePath = `${documentDirectory}mnemonic.txt`;
      writeAsStringAsync(tempFilePath, mnemonic)
        .then(() => Sharing.shareAsync(tempFilePath))
        .then(() => deleteAsync(tempFilePath));
    } else {
      // ニーモニックを作成する
      console.log('create mnemonic');
      setMnemonic(new Array(24).fill('test').join(' '));
    }
  }, [mnemonic]);

  return (
    <View className='flex-1 flex flex-col flex-grow justify-between items-center gap-3 px-6 py-24'>
      <View className='flex flex-col items-center'>
        <Avatar source={require('@/assets/icon.png')} size='lg' />
      </View>
      <View className='py-12'>
        <Text>{t('login.generated.title')}</Text>
      </View>
      <View className='flex flex-grow flex-col justify-start space-y-8 w-full max-w-sm'>
        <View>
          <Text>{t('login.generated.input_label')}</Text>
          <TextArea value={mnemonic} />
        </View>
        <View className='flex flex-row justify-center items-center gap-x-2 pb-2'>
          <Checkbox value={checked} onValueChange={setChecked} className='w-6 h-6' />
          <Pressable onPress={() => setChecked(!checked)}>
            <Text className='text-xl font-semibold'>保存しました</Text>
          </Pressable>
        </View>
        <Text>{t('login.new.precautions2_content')}</Text>
      </View>

      <Button className='w-full max-w-sm' onPress={handleSubmit}>
        {checked ? '次へ' : '再生成する'}
      </Button>
    </View>
  );
}
