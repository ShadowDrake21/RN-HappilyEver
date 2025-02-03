import { Tabs } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { COLORS } from '~/constants/colors';
import { MainSettingsProvider } from '~/context/MainSettingsContext';

const TabsLayout = () => {
  return (
    <Tabs screenOptions={{ sceneStyle: { backgroundColor: COLORS.extraDark } }}>
      <Tabs.Screen name="home" />
      <Tabs.Screen name="messages" />
      <Tabs.Screen name="likes" />
      <Tabs.Screen name="events" />
      <Tabs.Screen name="search" />
      <Tabs.Screen name="profile" />
      <Tabs.Screen name="premium" />
    </Tabs>
  );
};

const Layout = () => (
  <MainSettingsProvider>
    <TabsLayout />
  </MainSettingsProvider>
);

export default Layout;

const styles = StyleSheet.create({});
