import { Stack } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="send-code" />
      <Stack.Screen name="verificate-code" />
      <Stack.Screen name="create-new-password" />
    </Stack>
  );
};

export default Layout;
