import { Stack, useRootNavigationState, useRouter } from 'expo-router';
import { useEffect } from 'react';

import { modeConfig } from '@/util/configs/mode';

export default function HomeLayout(): JSX.Element {
  const router = useRouter();
  const rootNavigationState = useRootNavigationState();
  const isLoadFailed = true; // WALLET がなかったとする

  useEffect(() => {
    if (isLoadFailed && rootNavigationState?.key) {
      router.replace('login');
    }
  }, []);

  return (
    <Stack initialRouteName='index'>
      <Stack.Screen
        name='index'
        options={{
          title: modeConfig.APPLICATION_NAME,
          headerShown: true,
          headerBackVisible: false,
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
    </Stack>
  );
}
