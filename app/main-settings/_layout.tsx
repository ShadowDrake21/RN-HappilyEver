import { Stack } from 'expo-router';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { COLORS } from '~/constants/colors';

const Layout = () => {
  const { bottom } = useSafeAreaInsets();
  return (
    <Stack
      screenOptions={{
        contentStyle: {
          backgroundColor: COLORS.dark,
          paddingHorizontal: 20,
          paddingBottom: bottom + 10,
        },
      }}>
      <Stack.Screen name="select-country" />
      <Stack.Screen name="fill-profile-data" />
      <Stack.Screen name="add-photos" />
      <Stack.Screen name="select-interests" />
      <Stack.Screen name="select-ideal-match" />
    </Stack>
  );
};

export default Layout;
