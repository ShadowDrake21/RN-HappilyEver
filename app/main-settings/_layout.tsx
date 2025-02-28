import HeaderLeftButton from '@components/main-settings/HeaderActionButton';
import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { COLORS } from '~/constants/colors';
import { MainSettingsProvider, useMainSettings } from '~/context/MainSettingsContext';

const MainSettingsLayout = () => {
  const { bottom } = useSafeAreaInsets();
  const router = useRouter();
  const { dispatch } = useMainSettings();

  const screenOptions = {
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
    headerTitleStyle: {
      fontSize: 20,
    },
    headerShadowVisible: false,
  };

  return (
    <Stack screenOptions={screenOptions}>
      <Stack.Screen
        name="select-country"
        options={{
          title: 'Select Your Country',
        }}
      />
      <Stack.Screen
        name="fill-profile-data"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="fill-extended-data"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="add-photos"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="select-interests"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="select-ideal-match"
        options={{
          title: 'Select Ideal Match',
          headerLeft: ({ tintColor }) => (
            <HeaderLeftButton
              tintColor={tintColor}
              onPress={() => {
                dispatch({ type: 'SET_IDEAL_MATCH', payload: undefined });
                router.back();
              }}
            />
          ),
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
