import { usePathname, Stack, SplashScreen } from 'expo-router';
import { useEffect } from 'react';
import { View } from 'react-native';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

import { useLoadedAssets } from '@/hooks/useLoadedAssets';
import { PermissionError } from '@/models/ErrorModels';
import { DeviceHealthService } from '@/services/DeviceHealthService';
import { NotificationService } from '@/services/NotificationService';
import { StateProvider } from '@/states/context';
import { I18nProvider } from '@/states/i18nContext';

// Catch any errors thrown by the Layout component.
export { ErrorBoundary } from 'expo-router';
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout(): JSX.Element {
  const pathname = usePathname();
  const isLoadingComplete = useLoadedAssets();

  useEffect(() => {
    console.debug(`root: current page is ${pathname}`);
  }, [pathname]);

  useEffect(() => {
    // Check network status
    DeviceHealthService.isConnectionAvailable().then(async (isConnected) => {
      // 端末の起動時にネットワーク接続状態である場合は、push 通知の許可を求める
      if (isConnected) {
        const token = await new NotificationService().registerForPushNotificationsAsync();
        if (token instanceof PermissionError) {
          alert('Push notification permission denied.');
        }
      }
    });
  }, []);

  if (!isLoadingComplete) {
    return <View />;
  }

  return (
    <I18nProvider>
      <StateProvider>
        <Stack initialRouteName='home'>
          <Stack.Screen name='home' options={{ headerShown: false }} />
          <Stack.Screen name='index' options={{ headerShown: false }} />
          <Stack.Screen name='admin' options={{ headerShown: true }} />
          <Stack.Screen name='login' options={{ headerShown: false }} />
        </Stack>
      </StateProvider>
      <Toast />
    </I18nProvider>
  );
}
