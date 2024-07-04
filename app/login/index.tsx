import { useRouter } from 'expo-router';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Avatar from '@/components/atom/Avatar';
import Button from '@/components/atom/Button';
import { useI18n } from '@/hooks/useI18n';

export default function LoginRoot(): React.JSX.Element {
  const { t, locale, setLocale } = useI18n();
  const router = useRouter();

  const handleCreateNew = () => {
    router.push('/login/create');
  };

  const handleImport = () => {
    router.push('/login/import');
  };

  const handleOpenModal = () => {
    router.push('/account/terms');
  };

  const toggleLanguage = () => {
    const lang = locale === 'en' ? 'ja' : 'en';
    setLocale(lang);
  };

  return (
    <SafeAreaView className='flex-1 flex flex-col items-center p-6'>
      <View className='flex flex-col items-center'>
        <Avatar source={require('@/assets/icon.png')} size='lg' />
      </View>
      <View className='py-12'>
        <Text className='text-2xl font-bold'>Base Wallet</Text>
      </View>
      <View className='flex flex-col justify-center space-y-10 w-full max-w-sm'>
        <Button variant='default' onPress={handleCreateNew}>
          {t('pages.login.index.new')}
        </Button>
        <Button variant='outline' onPress={handleImport}>
          {t('pages.login.index.import')}
        </Button>
      </View>
      <View className='mt-auto'>
        <Text className='text-sm text-muted-foreground'>{t('pages.login.index.remark')}</Text>
      </View>
      <View className='flex flex-row justify-end w-full'>
        <Button variant='link' onPress={handleOpenModal}>
          {t('pages.login.index.terms')}
        </Button>
        <Button variant='link' onPress={toggleLanguage}>
          {t('pages.login.index.language')}
        </Button>
        <Button variant='link' onPress={() => router.push('/_sitemap')}>
          サイトマップ
        </Button>
      </View>
    </SafeAreaView>
  );
}
