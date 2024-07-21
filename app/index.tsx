import { Redirect, useRootNavigationState } from 'expo-router';

export default function RootPage() {
  // // Attempted to navigate before mounting the Root Layout component. Ensure the Root Layout component is rendering a Slot, or other navigator on the first render. への対策

  const rootNavigationState = useRootNavigationState();
  if (!rootNavigationState?.key) return null;
  return <Redirect href='home' />;
}
