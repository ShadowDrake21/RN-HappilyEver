import HeaderLeftButton from '@components/main-settings/HeaderLeftButton';
import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { COLORS } from '~/constants/colors';
import { MainSettingsProvider, useMainSettings } from '~/context/MainSettingsContext';
import { MainSettingsActionType } from '~/types/main-settings.types';

type MainSettingsScreenProps = {
  name: string;
  title: string;
  action: MainSettingsActionType;
};

const MainSettingsScreen = ({ name, title, action }: MainSettingsScreenProps) => {
  const router = useRouter();
  const { dispatch } = useMainSettings();

  return (
    <Stack.Screen
      name={name}
      options={{
        title,
        headerLeft: ({ tintColor }) => (
          <HeaderLeftButton
            tintColor={tintColor}
            onPress={() => {
              dispatch(action);
              router.back();
            }}
          />
        ),
      }}
    />
  );
};

const MainSettingsLayout = () => {
  const { bottom } = useSafeAreaInsets();

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
      <MainSettingsScreen
        name="select-country"
        title="Select Your Country"
        action={{ type: 'SET_COUNTRY_ID', payload: '' }}
      />
      <MainSettingsScreen
        name="fill-profile-data"
        title="Fill Your Profile"
        action={{ type: 'SET_PROFILE_BASIC_FORM', payload: undefined }}
      />
      <MainSettingsScreen
        name="fill-extended-data"
        title="Fill Extended Information"
        action={{ type: 'SET_PROFILE_EXTENDED_FORM', payload: undefined }}
      />
      <MainSettingsScreen
        name="add-photos"
        title="Add Your Best Photos"
        action={{ type: 'SET_PHOTOS', payload: [] }}
      />
      <MainSettingsScreen
        name="select-interests"
        title="Select Your Interests"
        action={{ type: 'SET_INTERESTS', payload: [] }}
      />
      <MainSettingsScreen
        name="select-ideal-match"
        title="Select Ideal Match"
        action={{ type: 'SET_IDEAL_MATCH', payload: undefined }}
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
