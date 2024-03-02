import { Stack } from 'expo-router';

export default function LoginLayout(): JSX.Element {
  return (
    <Stack initialRouteName='index'>
      <Stack.Screen name='index' options={{ headerShown: true }} />
    </Stack>
  );
}
