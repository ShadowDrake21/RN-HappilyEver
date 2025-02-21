import { useAuth } from '@clerk/clerk-expo';
import { Href, Redirect, Stack, useRouter } from 'expo-router';
import React, { useCallback } from 'react';
import { IconButton } from 'react-native-paper';

import { COLORS } from '~/constants/colors';

const Layout = () => {
  const router = useRouter();
  const { isSignedIn } = useAuth();

  const buttonBack = useCallback(
    (path: Href) => (
      <IconButton
        icon="arrow-left"
        iconColor={COLORS.text}
        size={20}
        onPress={() => router.navigate(path)}
      />
    ),
    []
  );

  if (isSignedIn) {
    return <Redirect href="/home" />;
  }

  return (
    <Stack
      screenOptions={{
        title: '',
        headerShadowVisible: false,
        headerStyle: { backgroundColor: COLORS.dark },
        contentStyle: { backgroundColor: COLORS.dark, paddingHorizontal: 20 },
        headerTintColor: COLORS.text,
      }}>
      <Stack.Screen
        name="index"
        options={{
          headerLeft: () => buttonBack('/onboarding/onboarding-first'),
        }}
      />
      <Stack.Screen
        name="sign-up"
        options={{
          headerLeft: () => buttonBack('/auth'),
        }}
      />
      <Stack.Screen
        name="sign-in"
        options={{
          headerLeft: () => buttonBack('/auth'),
        }}
      />
      <Stack.Screen
        name="(reset-password)"
        options={{
          headerLeft: () => buttonBack('/auth/sign-in'),
        }}
      />
    </Stack>
  );
};

export default Layout;
