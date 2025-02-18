import React from 'react';
import { View, Text, Platform } from 'react-native';

const NavBar = ({ name }: { name: string | undefined }) => {
  if (Platform.OS === 'web') return null;

  return (
    <View
      style={{
        alignItems: 'center',
        paddingTop: 10,
      }}>
      <Text>{name || 'Unknown user'}</Text>
    </View>
  );
};

export default NavBar;
