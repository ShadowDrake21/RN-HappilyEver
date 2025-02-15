import React from 'react';
import { View, Text, Platform } from 'react-native';

const NavBar = () => {
  if (Platform.OS === 'web') return null;

  return (
    <View
      style={{
        alignItems: 'center',
        paddingTop: 10,
      }}>
      <Text>💬 Gifted Chat{'\n'}</Text>
    </View>
  );
};

export default NavBar;
