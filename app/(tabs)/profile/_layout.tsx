import { Feather, FontAwesome5 } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import React from 'react';
import { Pressable } from 'react-native';

import { COLORS } from '~/constants/colors';

const Layout = () => (
  <Stack
    screenOptions={{
      headerTitleStyle: { fontSize: 20 },
      headerStyle: { backgroundColor: COLORS.extraDark },
      contentStyle: { backgroundColor: COLORS.extraDark },
    }}>
    <Stack.Screen
      name="index"
      options={{
        title: 'Profile',
        headerTintColor: COLORS.text,
        headerShadowVisible: false,
        headerLeft: () => (
          <Pressable style={{ marginLeft: 10 }} onPress={() => console.log('support')}>
            <FontAwesome5 name="headset" size={24} color={COLORS.grayish} />
          </Pressable>
        ),
        headerRight: () => (
          <Pressable style={{ marginRight: 10 }} onPress={() => console.log('edit')}>
            <Feather name="edit" size={24} color={COLORS.grayish} />
          </Pressable>
        ),
      }}
    />
    <Stack.Screen name="[type]" />
  </Stack>
);

export default Layout;
