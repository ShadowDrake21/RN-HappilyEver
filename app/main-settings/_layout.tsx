import { Stack } from 'expo-router';
import React from 'react';

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="select-country" />
      <Stack.Screen name="fill-profile-data" />
      <Stack.Screen name="add-photos" />
      <Stack.Screen name="select-interests" />
      <Stack.Screen name="select-ideal-match" />
    </Stack>
  );
};

export default Layout;
