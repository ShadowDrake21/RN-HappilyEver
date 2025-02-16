import React from 'react';
import { View, Text, Platform } from 'react-native';

const NavBar = ({ id }: { id: string }) => {
  if (Platform.OS === 'web') return null;

  return (
    <View
      style={{
        alignItems: 'center',
        paddingTop: 10,
      }}>
      <Text>💬 {id}</Text>
    </View>
  );
};

export default NavBar;
