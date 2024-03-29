import { useRouter } from 'expo-router';
import LottieView from 'lottie-react-native';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import CompleteAnimation from '@/assets/animations/complete.json';
import Avatar from '@/components/atom/Avatar';
import Button from '@/components/atom/Button';
import { useI18n } from '@/hooks/useI18n';

export default function LoginComplete(): JSX.Element {
  const { t } = useI18n();
  const router = useRouter();

  const handleComplete = () => {
    router.replace('/');
  };

  return (
    <SafeAreaView className='flex-1 flex flex-col items-center p-6'>
      <View className='flex flex-col items-center'>
        <Avatar source={require('@/assets/icon.png')} size='lg' />
      </View>
      <View className='flex flex-grow items-center justify-center w-full max-w-sm'>
        <LottieView source={CompleteAnimation} autoPlay style={{ height: 200, width: 200 }} />
        <Text className='text-base'>{t('pages.login.complete.finished')}</Text>
      </View>
      <Button variant='default' className='w-full max-w-sm' onPress={handleComplete}>
        {t('common.next')}
      </Button>
    </SafeAreaView>
  );
}
