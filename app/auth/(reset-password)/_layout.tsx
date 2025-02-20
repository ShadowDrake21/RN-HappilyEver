import { Stack } from 'expo-router';
import React from 'react';

import { COLORS } from '~/constants/colors';

const Layout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: COLORS.dark,
        },
      }}>
      <Stack.Screen name="send-code" />
      <Stack.Screen name="verificate-code" />
      <Stack.Screen name="create-new-password" />
    </Stack>
  );
};

export default Layout;
