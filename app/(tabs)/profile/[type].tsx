import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Page = () => {
  const { type } = useLocalSearchParams<{ type: string }>();

  return (
    <View>
      <Text>{type}</Text>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({});
