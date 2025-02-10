import Feather from '@expo/vector-icons/Feather';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Tabs } from 'expo-router';
import React from 'react';
import { Pressable } from 'react-native';

import { COLORS } from '~/constants/colors';
import { MainSettingsProvider } from '~/context/MainSettingsContext';
import { ProfileImageSelectionProvider } from '~/context/ProfileImageSelectionContext';
const TabsLayout = () => {
  const screenOptions = {
    headerTitleStyle: { fontSize: 20 },
    sceneStyle: { backgroundColor: COLORS.extraDark },
    tabBarStyle: {
      backgroundColor: COLORS.extraDark,
      borderTopWidth: 0,
    },
    tabBarInactiveTintColor: COLORS.grayish,
    tabBarActiveTintColor: COLORS.mainPurple,
    tabBarLabelStyle: {
      textTransform: 'capitalize' as 'capitalize',
    },
  };

  return (
    <Tabs screenOptions={screenOptions}>
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => <Feather name="home" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="message-circle" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="likes"
        options={{
          tabBarIcon: ({ color, size }) => <Feather name="heart" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="events"
        options={{
          tabBarIcon: ({ color, size }) => <MaterialIcons name="event" size={size} color={color} />,
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          headerStyle: { backgroundColor: COLORS.extraDark },
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
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-circle-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="premium"
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="workspace-premium" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

const Layout = () => (
  <MainSettingsProvider>
    <ProfileImageSelectionProvider>
      <TabsLayout />
    </ProfileImageSelectionProvider>
  </MainSettingsProvider>
);

export default Layout;
