import { useRouter } from 'expo-router';
import { View, Text } from 'react-native';

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
    <View className='flex-1 flex flex-col flex-grow justify-between items-center gap-3 px-6 py-24'>
      <View className='flex flex-col items-center'>
        <Avatar source={require('@/assets/icon.png')} size='lg' />
      </View>
      <View className='py-12'>
        <Text className='text-2xl font-bold'>Base Wallet</Text>
      </View>
      <View className='flex flex-grow flex-col justify-center space-y-12 w-full max-w-sm'>
        <Button variant='default' onPress={handleCreateNew}>
          {t('login.index.new')}
        </Button>
        <Button variant='outline' onPress={handleImport}>
          {t('login.index.import')}
        </Button>
      </View>
      <View>
        <Text className='text-sm text-muted-foreground'>{t('login.index.remark')}</Text>
      </View>
      <View className='flex flex-row justify-end w-full'>
        <Button variant='link' onPress={handleOpenModal}>
          {t('login.index.terms')}
        </Button>
        <Button variant='link' onPress={toggleLanguage}>
          {t('login.index.language')}
        </Button>
      </View>
    </View>
  );
}
