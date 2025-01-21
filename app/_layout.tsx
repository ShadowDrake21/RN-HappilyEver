import '../global.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack, useRouter } from 'expo-router';
import { useEffect } from 'react';

import useTokenExpiration from '~/hooks/useTokenExpiration';
import { useAuthStore } from '~/store/store';

const queryClient = new QueryClient();

const RootLayout = () => {
  useTokenExpiration();
  const { isLoggedIn, isNewUser } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      if (isNewUser) {
        router.replace('/main-settings/select-country');
        return;
      }
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
};

const Layout = () => (
  <QueryClientProvider client={queryClient}>
    <RootLayout />
  </QueryClientProvider>
);

export default Layout;
