import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Page = () => {
  return (
    <View>
      <Image source={require('assets/onboarding/onboarding-1.png')} />
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({});
