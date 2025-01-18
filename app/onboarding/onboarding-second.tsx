import { Link } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Page = () => {
  return (
    <View className="flex-1">
      <Text>Page 2</Text>
      <Image
        source={require('assets/onboarding/onboarding-2.png')}
        className=" w-full flex-1"
        resizeMode="contain"
      />
      <Link href="./onboarding-third">
        <TouchableOpacity>
          <Text>Next</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({});
