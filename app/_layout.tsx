import '../global.css';
import { Stack, useRouter } from 'expo-router';
import { useEffect } from 'react';

import useTokenExpiration from '~/hooks/useTokenExpiration';
import { useAuthStore } from '~/store/store';

export default function Layout() {
  useTokenExpiration();
  const { isLoggedIn } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      router.replace('/home');
    } else {
      router.replace('/onboarding/onboarding-first');
    }
  }, [isLoggedIn]);

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="onboarding" />
      <Stack.Screen name="auth" />
      <Stack.Screen name="main-settings" />
    </Stack>
  );
}
