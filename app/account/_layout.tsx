import { Stack } from 'expo-router';

export default function AccountLayout(): JSX.Element {
  return (
    <Stack initialRouteName='index'>
      <Stack.Screen name='index' options={{ headerShown: false }} />
      <Stack.Screen name='contract' options={{ headerShown: true }} />
      <Stack.Screen name='license' options={{ headerShown: true }} />
      <Stack.Screen name='network' options={{ headerShown: true }} />
      <Stack.Screen name='policy' options={{ headerShown: true }} />
      <Stack.Screen name='qa' options={{ headerShown: true }} />
      <Stack.Screen name='terms' options={{ headerShown: true }} />
    </Stack>
  );
}
