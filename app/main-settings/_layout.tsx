import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { IconButton } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { COLORS } from '~/constants/colors';
import { MainSettingsProvider } from '~/context/MainSettingsContext';

const MainSettingsLayout = () => {
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
        headerStyle: {
          backgroundColor: COLORS.dark,
        },
        headerLeft: ({ tintColor }) => (
          <IconButton
            icon="arrow-left"
            iconColor={tintColor}
            size={20}
            onPress={() => router.back()}
          />
        ),
        headerTitleStyle: {
          fontSize: 20,
        },
        headerShadowVisible: false,
      }}>
      <Stack.Screen
        name="select-country"
        options={{
          title: 'Select Your Country',
        }}
      />
      <Stack.Screen
        name="fill-profile-data"
        options={{
          title: 'Fill Your Profile',
        }}
      />
      <Stack.Screen
        name="fill-extended-data"
        options={{
          title: 'Fill Extended Information',
        }}
      />
      <Stack.Screen
        name="add-photos"
        options={{
          title: 'Add Your Best Photos',
        }}
      />
      <Stack.Screen
        name="select-interests"
        options={{
          title: 'Select Your Interests',
        }}
      />
      <Stack.Screen
        name="select-ideal-match"
        options={{
          title: 'Select Ideal Match',
        }}
      />
    </Stack>
  );
};

const Layout = () => (
  <MainSettingsProvider>
    <MainSettingsLayout />
  </MainSettingsProvider>
);

export default Layout;
