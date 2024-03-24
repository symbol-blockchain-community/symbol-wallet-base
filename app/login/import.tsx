import { useRouter } from 'expo-router';
import { useState } from 'react';
import { View, Text, Keyboard, ScrollView } from 'react-native';

import Avatar from '@/components/atom/Avatar';
import Button from '@/components/atom/Button';
import TextArea from '@/components/atom/Textarea';
import { useI18n } from '@/hooks/useI18n';

export default function LoginImport(): JSX.Element {
  const { t } = useI18n();
  const router = useRouter();
  const [mnemonic, setMnemonic] = useState<string>('');

  const handleOnChange = (e: string) => {
    // 半角小文字入力を矯正し、数値と記号は除外、かつ 24 単語以上の入力を禁止
    e = e.replace(/[Ａ-Ｚａ-ｚ０-９]/g, (s) => String.fromCharCode(s.charCodeAt(0) - 0xfee0));
    if (!e.match(/[0-9]|[^\w\s]/) && e.split(' ').length <= 24) {
      setMnemonic(e.toLowerCase());
    }
  };

  const handleComplete = () => {
    // TODO: ニーモニックを解析し、問題がなければ Secure Storage へ格納する
    router.push('/login/imported');
  };

  return (
    <ScrollView className='flex-1'>
      <View className='min-h-screen flex flex-col flex-grow justify-between items-center gap-3 px-6 py-24'>
        <View className='flex flex-col items-center'>
          <Avatar source={require('@/assets/icon.png')} size='lg' />
        </View>
        <View className='py-12'>
          <Text className='text-base'>{t('login.import.title')}</Text>
        </View>
        <View className='flex flex-grow flex-col justify-start space-y-8 w-full max-w-sm'>
          <View>
            <Text className='pb-2'>{t('login.generated.input_label')}</Text>
            <TextArea
              value={mnemonic}
              onChangeText={handleOnChange}
              className='text-lg tracking-wider p-8 text-primary'
              placeholder='example: test eat town super sum hello world byte horse ...'
              returnKeyType='done'
              blurOnSubmit
            />
          </View>
          <Text>{t('login.new.precautions2_content')}</Text>
        </View>
        {mnemonic.split(' ').length === 24 && (
          <Button variant='default' className='w-full max-w-sm' onPress={handleComplete}>
            {t('common.next')}
          </Button>
        )}
      </View>
    </ScrollView>
  );
}
