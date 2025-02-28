import ComingSoon from '@components/shared/ComingSoon';
import { Stack } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Page = () => {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ComingSoon />
    </>
  );
};

export default Page;

const styles = StyleSheet.create({});
