import { DefaultTheme } from '@react-navigation/native';
import { Link, Stack, useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { IconButton, MD3Colors } from 'react-native-paper';

import { COLORS } from '~/constants/colors';

const Layout = () => {
  const router = useRouter();
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
          headerLeft: ({ tintColor }) => (
            <IconButton
              icon="arrow-left"
              iconColor={tintColor}
              size={20}
              onPress={() => router.navigate('/onboarding/onboarding-first')}
            />
          ),
        }}
      />
      <Stack.Screen name="sign-up" />
      <Stack.Screen name="sign-in" />
    </Stack>
  );
};

export default Layout;

const styles = StyleSheet.create({});
