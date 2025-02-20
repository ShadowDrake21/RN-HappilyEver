import Feather from '@expo/vector-icons/Feather';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Tabs, useRouter } from 'expo-router';
import React from 'react';
import { Pressable } from 'react-native';

import { COLORS } from '~/constants/colors';
import { MainSettingsProvider } from '~/context/MainSettingsContext';
import { ProfileImageSelectionProvider } from '~/context/ProfileImageSelectionContext';
import { SwipesProvider } from '~/context/SwipesContext';
import useChatListener from '~/hooks/listeners/useChatListener';
import useMatchListener from '~/hooks/listeners/useMatchListener';
import { createChat } from '~/supabase/supabase-chatting';
import { Match } from '~/types/match.types';

const TabsLayout = () => {
  const screenOptions = {
    headerTitleStyle: { fontSize: 20 },
    sceneStyle: { backgroundColor: COLORS.extraDark },
    tabBarStyle: {
      backgroundColor: COLORS.extraDark,
      borderTopWidth: 0,
    },
    headerStyle: { backgroundColor: COLORS.extraDark },
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
          headerLeft: () => (
            <Pressable style={{ marginLeft: 20 }} onPress={() => console.log('archive')}>
              <Feather name="archive" size={24} color={COLORS.grayish} />
            </Pressable>
          ),
          headerRight: () => (
            <Pressable style={{ marginRight: 20 }} onPress={() => console.log('chats settings')}>
              <Feather name="settings" size={24} color={COLORS.grayish} />
            </Pressable>
          ),
          title: 'Chats',
          headerTintColor: COLORS.text,
          headerShadowVisible: false,
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
          headerShown: false,
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

const Layout = () => {
  const router = useRouter();

  useMatchListener((match: Match) => {
    router.push(`/match/${match.id}`);
  });

  return (
    <MainSettingsProvider>
      <SwipesProvider>
        <ProfileImageSelectionProvider>
          <TabsLayout />
        </ProfileImageSelectionProvider>
      </SwipesProvider>
    </MainSettingsProvider>
  );
};

export default Layout;
