import '../shim';
import { usePathname, Stack, Link, SplashScreen, useRouter } from 'expo-router';
import { Pressable, View } from 'react-native';
import Toast from 'react-native-toast-message';

import { IconAccount, IconClose } from '@/components/atom/Icons';
import { useLoadedAssets } from '@/hooks/useLoadedAssets';
import { StateProvider } from '@/states/context';
import { I18nProvider } from '@/states/i18nContext';
import { modeConfig } from '@/util/configs/mode';

// Catch any errors thrown by the Layout component.
export { ErrorBoundary } from 'expo-router';
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout(): JSX.Element {
  const pathname = usePathname();
  const router = useRouter();
  const isLoadingComplete = useLoadedAssets();

  console.debug(`root: current page is ${pathname}`);

  const handleHeaderRightClickForPage = () => {
    return (
      <Link href='/account'>
        <IconAccount />
      </Link>
    );
  };

  const handleHeaderLeftClickForModal = () => {
    return (
      <Pressable onPress={() => router.back()}>
        <IconClose />
      </Pressable>
    );
  };

  if (!isLoadingComplete) {
    return <View />;
  }

  return (
    <I18nProvider>
      <StateProvider>
        <Stack initialRouteName='index'>
          <Stack.Screen
            name='index'
            options={{
              title: modeConfig.APPLICATION_NAME,
              headerShown: true,
              headerRight: handleHeaderRightClickForPage,
              headerLeft: () => <></>, // トップページは戻るボタンは表示しない
            }}
          />
          <Stack.Screen
            name='account'
            options={{
              title: 'Account',
              headerShown: false,
              presentation: 'modal',
              headerLeft: handleHeaderLeftClickForModal,
            }}
          />
          <Stack.Screen
            name='login'
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name='wallet'
            options={{
              headerShown: false,
            }}
          />
        </Stack>
      </StateProvider>
      <Toast />
    </I18nProvider>
  );
}
