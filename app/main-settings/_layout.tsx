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
          title: 'Fill Your Profile',
          headerLeft: ({ tintColor }) => (
            <HeaderLeftButton
              tintColor={tintColor}
              onPress={() => {
                dispatch({ type: 'SET_PROFILE_BASIC_FORM', payload: undefined });
                router.back();
              }}
            />
          ),
        }}
      />
      <Stack.Screen
        name="fill-extended-data"
        options={{
          title: 'Fill Extended Information',
          headerLeft: ({ tintColor }) => (
            <HeaderLeftButton
              tintColor={tintColor}
              onPress={() => {
                dispatch({ type: 'SET_PROFILE_EXTENDED_FORM', payload: undefined });
                router.back();
              }}
            />
          ),
        }}
      />
      <Stack.Screen
        name="add-photos"
        options={{
          title: 'Add Your Best Photos',
          headerLeft: ({ tintColor }) => (
            <HeaderLeftButton
              tintColor={tintColor}
              onPress={() => {
                dispatch({ type: 'SET_PHOTOS', payload: [] });
                router.back();
              }}
            />
          ),
        }}
      />
      <Stack.Screen
        name="select-interests"
        options={{
          title: 'Select Your Interests',
          headerLeft: ({ tintColor }) => (
            <HeaderLeftButton
              tintColor={tintColor}
              onPress={() => {
                dispatch({ type: 'SET_INTERESTS', payload: [] });
                router.back();
              }}
            />
          ),
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
