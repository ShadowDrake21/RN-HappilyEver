import { Redirect } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Page = () => {
  return <Redirect href="/onboarding/onboarding-first" />;
};

export default Page;

const styles = StyleSheet.create({});
