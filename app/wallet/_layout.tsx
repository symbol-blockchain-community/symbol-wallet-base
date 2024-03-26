import { Stack } from 'expo-router';

export default function WalletLayout(): JSX.Element {
  return (
    <Stack>
      <Stack.Screen name='[public_key]' options={{ headerShown: false }} />
    </Stack>
  );
}
