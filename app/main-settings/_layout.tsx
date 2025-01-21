import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { IconButton } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { COLORS } from '~/constants/colors';

const Layout = () => {
  const router = useRouter();
  const { bottom } = useSafeAreaInsets();

  return (
    <Stack
      screenOptions={{
        contentStyle: {
          backgroundColor: COLORS.dark,
          paddingHorizontal: 20,
          paddingBottom: bottom + 10,
          paddingTop: 20,
        },
        headerTintColor: COLORS.text,
        headerLeft: ({ tintColor }) => (
          <IconButton
            icon="arrow-left"
            iconColor={tintColor}
            size={20}
            onPress={() => router.navigate('/auth')}
          />
        ),
      }}>
      <Stack.Screen
        name="select-country"
        options={{
          title: 'Select Your Country',
          headerStyle: {
            backgroundColor: COLORS.dark,
          },
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen name="fill-profile-data" />
      <Stack.Screen name="add-photos" />
      <Stack.Screen name="select-interests" />
      <Stack.Screen name="select-ideal-match" />
    </Stack>
  );
};

export default Layout;
