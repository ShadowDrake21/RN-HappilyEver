import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { TouchableOpacity } from 'react-native';
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
          // headerLeft: ({ tintColor }) => (
          //   <IconButton
          //     icon="arrow-left"
          //     iconColor={tintColor}
          //     size={20}
          //     onPress={() => router.push('/auth')}
          //   />
          // ),
        }}
      />
      <Stack.Screen
        name="fill-profile-data"
        options={{
          title: 'Fill Your Profile',
          // headerLeft: ({ tintColor }) => (
          //   <IconButton
          //     icon="arrow-left"
          //     iconColor={tintColor}
          //     size={20}
          //     onPress={() => router.push('./select-country')}
          //   />
          // ),
        }}
      />
      <Stack.Screen
        name="add-photos"
        options={{
          title: 'Add Your Best Photos',
          // headerLeft: ({ tintColor }) => (
          //   <IconButton
          //     icon="arrow-left"
          //     iconColor={tintColor}
          //     size={20}
          //     onPress={() => router.push('./fill-profile-data')}
          //   />
          // ),
        }}
      />
      <Stack.Screen
        name="select-interests"
        options={{
          title: 'Select Your Interests',
          // headerLeft: ({ tintColor }) => (
          //   <IconButton
          //     icon="arrow-left"
          //     iconColor={tintColor}
          //     size={20}
          //     onPress={() => router.push('./add-photos')}
          //   />
          // ),
        }}
      />
      <Stack.Screen
        name="select-ideal-match"
        options={{
          title: 'Select Ideal Match',
          // headerLeft: ({ tintColor }) => (
          //   <IconButton
          //     icon="arrow-left"
          //     iconColor={tintColor}
          //     size={20}
          //     onPress={() => router.push('./select-interests')}
          //   />
          // ),
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
