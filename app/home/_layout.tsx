import { Tabs } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { MainSettingsProvider } from '~/context/MainSettingsContext';

const HomeLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen name="index" />
    </Tabs>
  );
};

const Layout = () => (
  <MainSettingsProvider>
    <HomeLayout />
  </MainSettingsProvider>
);

export default Layout;

const styles = StyleSheet.create({});
