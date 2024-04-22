import { useRouter } from 'expo-router';
import { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Avatar from '@/components/atom/Avatar.js';
import Button from '@/components/atom/Button.js';
import Checkbox from '@/components/atom/Checkbox.js';
import { useI18n } from '@/hooks/useI18n.js';
import { cn } from '@/util/classes.js';

export default function LoginCreate(): React.JSX.Element {
  const [precaution1, setPrecaution1] = useState<boolean>(false);
  const [precaution2, setPrecaution2] = useState<boolean>(false);
  const { t } = useI18n();
  const router = useRouter();

  const handleSubmit = () => {
    router.push('/login/generated');
  };

  return (
    <SafeAreaView className='flex-1 flex flex-col items-center p-6'>
      <View className='flex flex-col items-center'>
        <Avatar source={require('@/assets/icon.png')} size='lg' />
      </View>
      <View className='py-6'>
        <Text className='text-base'>{t('pages.login.new.precautions')}</Text>
      </View>
      <View className='flex flex-col justify-center space-y-6 w-full max-w-sm'>
        {[
          {
            title: t('pages.login.new.precautions1_title'),
            content: t('pages.login.new.precautions1_content'),
            checked: precaution1,
            setChecked: setPrecaution1,
          },
          {
            title: t('pages.login.new.precautions2_title'),
            content: t('pages.login.new.precautions2_content'),
            checked: precaution2,
            setChecked: setPrecaution2,
          },
        ].map((item, index) => (
          <View key={index} className={cn(index === 1 && !precaution1 && 'opacity-0')}>
            <View className='flex flex-row items-center gap-x-1 pb-2'>
              <Checkbox value={item.checked} onValueChange={item.setChecked} className='w-6 h-6' />
              <Pressable onPress={() => item.setChecked(!item.checked)}>
                <Text className='text-xl font-semibold'>{item.title}</Text>
              </Pressable>
            </View>
            <Text>{item.content}</Text>
          </View>
        ))}
      </View>
      <View className='mt-auto w-full'>
        <Button
          disabled={![precaution1, precaution2].every((e) => e)}
          variant={[precaution1, precaution2].every((e) => e) ? 'default' : 'ghost'}
          onPress={handleSubmit}
        >
          {[precaution1, precaution2].every((e) => e) ? t('pages.login.new.submit') : t('pages.login.new.checking')}
        </Button>
      </View>
    </SafeAreaView>
  );
}
