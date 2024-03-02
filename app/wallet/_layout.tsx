import { Stack } from 'expo-router';

export default function WalletsLayout(): JSX.Element {
  return (
    <Stack>
      <Stack.Screen name='[address]' options={{ headerShown: true }} />
    </Stack>
  );
}
