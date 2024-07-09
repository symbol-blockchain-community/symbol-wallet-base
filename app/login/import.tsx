import { useRouter } from 'expo-router';
import { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

import Avatar from '@/components/atom/Avatar';
import Button from '@/components/atom/Button';
import TextArea from '@/components/atom/Textarea';
import { useI18n } from '@/hooks/useI18n';
import { MnemonicService } from '@/services/MnemonicService';

export default function LoginImport(): JSX.Element {
  const { t } = useI18n();
  const router = useRouter();
  const [inputMnemonic, setInputMnemonic] = useState<string>('');

  const handleOnChange = (e: string) => {
    // 半角小文字入力を矯正し、数値と記号は除外、かつ 24 単語以上の入力を禁止
    e = e.replace(/[Ａ-Ｚａ-ｚ０-９]/g, (s) => String.fromCharCode(s.charCodeAt(0) - 0xfee0));
    if (!e.match(/[0-9]|[^\w\s]/) && e.split(' ').length <= 24) {
      setInputMnemonic(e.toLowerCase());
    }
  };

  const handleComplete = () => {
    try {
      const mnemonic = MnemonicService.generateFromPhrase(inputMnemonic);
      // ニーモニックを解析し、問題がなければ Secure Storage へ格納する
      mnemonic.replaceToStorage();
      router.push('/login/imported');
    } catch (error: any) {
      Toast.show({ type: 'error', text1: error.message });
    }
  };

  return (
    <ScrollView scrollEnabled={false}>
      <SafeAreaView className='flex flex-col min-h-[100vh] items-center p-6'>
        <View className='flex flex-col items-center'>
          <Avatar source={require('@/assets/icon.png')} size='lg' />
        </View>
        <View className='py-6'>
          <Text className='text-base'>{t('pages.login.import.title')}</Text>
        </View>
        <View className='flex flex-col justify-start w-full max-w-sm'>
          <Text className='pb-2'>{t('pages.login.generated.input_label')}</Text>
          <TextArea
            value={inputMnemonic}
            onChangeText={handleOnChange}
            className='text-lg tracking-wider p-8 text-primary'
            placeholder='example: test eat town super sum hello world byte horse ...'
            returnKeyType='done'
            blurOnSubmit
          />
        </View>
        {inputMnemonic.split(' ').length === 24 && (
          <Button variant='default' className='w-full max-w-sm mt-auto' onPress={handleComplete}>
            {t('common.next')}
          </Button>
        )}
      </SafeAreaView>
    </ScrollView>
  );
}
