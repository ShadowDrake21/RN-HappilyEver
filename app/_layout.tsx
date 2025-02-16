import '../global.css';
import { ClerkProvider, ClerkLoaded, useAuth } from '@clerk/clerk-expo';
import InformationModal from '@components/InformationModal';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import 'reanimatedConfig';

import { tokenCache } from '~/cache';
import { MatchesModalProvider } from '~/context/MatchesModalContext';
import useMatchListener from '~/hooks/useMatchListener';
import { Match } from '~/types/match.types';

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

if (!publishableKey) {
  throw new Error(
    'Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env'
  );
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchIntervalInBackground: false,
      refetchOnWindowFocus: false,
    },
  },
});

const RootLayout = () => {
  const { isLoaded, isSignedIn } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;

    const inTabsGroup = segments[0] === 'auth';

    console.log('User changed: ', isSignedIn);

    if (isSignedIn && !inTabsGroup) {
      // router.replace('/home');
      router.replace('/chat/1');
    } else if (!isSignedIn) {
      router.replace('/onboarding/onboarding-first');
    }
  }, [isSignedIn]);

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="onboarding" />
      <Stack.Screen name="auth" />
      <Stack.Screen name="main-settings" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="user/[id]" />
      <Stack.Screen name="match/[id]" />
      <Stack.Screen name="chat" />
    </Stack>
  );
};

const Layout = () => {
  const { top } = useSafeAreaInsets();

  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <ClerkLoaded>
        <QueryClientProvider client={queryClient}>
          <MatchesModalProvider>
            <RootLayout />
            <Toast position="top" topOffset={top} />
            <InformationModal />
          </MatchesModalProvider>
        </QueryClientProvider>
      </ClerkLoaded>
    </ClerkProvider>
  );
};

export default Layout;
