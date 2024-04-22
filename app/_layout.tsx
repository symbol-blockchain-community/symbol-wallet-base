import '../shim';
import { usePathname, Stack, Link, SplashScreen, useRouter } from 'expo-router';
import { Pressable, View } from 'react-native';
import { Toast } from 'react-native-toast-message/lib/src/Toast.js';

import { IconAccount, IconClose } from '@/components/atom/Icons.js';
import { useLoadedAssets } from '@/hooks/useLoadedAssets.js';
import { StateProvider } from '@/states/context.js';
import { I18nProvider } from '@/states/i18nContext.js';
import { modeConfig } from '@/util/configs/mode.js';

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
          {/* Root Route */}
          <Stack.Screen name='admin' options={{ headerShown: true }} />
          <Stack.Screen
            name='index'
            options={{
              title: modeConfig.APPLICATION_NAME,
              headerShown: true,
              headerBackVisible: false,
              headerRight: handleHeaderRightClickForPage,
            }}
          />
          {/* Root - Modal Group */}
          <Stack.Screen name='(modals)/modal_camera' options={{ headerShown: true }} />
          <Stack.Screen name='(modals)/modal_create_transaction' options={{ headerShown: true }} />
          {/* Root - Account Group */}
          <Stack.Screen name='(account)/account_contract' options={{ headerShown: true }} />
          <Stack.Screen name='(account)/account_create' options={{ headerShown: false }} />
          {/* Root - Network Group */}
          <Stack.Screen name='(network)/network_index' options={{ headerShown: false }} />
          <Stack.Screen name='(network)/network_node_custom' options={{ headerShown: false }} />
          <Stack.Screen name='(network)/network_node_select' options={{ headerShown: false }} />
          <Stack.Screen name='(network)/network_type_select' options={{ headerShown: false }} />
          {/* Root - System Group */}
          <Stack.Screen name='(system)/system_license' options={{ headerShown: false }} />
          <Stack.Screen name='(system)/system_policy' options={{ headerShown: false }} />
          <Stack.Screen name='(system)/system_qa' options={{ headerShown: false }} />
          <Stack.Screen name='(system)/system_terms' options={{ headerShown: false }} />
          {/* Wallet Route */}
          <Stack.Screen name='wallet/[public_key]' options={{ headerShown: true }} />
          {/* Login Route */}
          <Stack.Screen name='login' options={{ headerShown: false }} />
        </Stack>
      </StateProvider>
      <Toast />
    </I18nProvider>
  );
}
