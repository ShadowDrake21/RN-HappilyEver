import React from 'react';
import { View, Text, Platform } from 'react-native';

const NavBar = ({ id }: { id: string | undefined }) => {
  if (Platform.OS === 'web') return null;

  return (
    <View
      style={{
        alignItems: 'center',
        paddingTop: 10,
      }}>
      <Text>💬 {id || 'Unknown user'}</Text>
    </View>
  );
};

export default NavBar;
