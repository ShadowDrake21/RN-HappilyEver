import React, { PropsWithChildren } from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { Button } from 'react-native-paper';

import { COLORS } from '~/constants/colors';

type MainButtonProps = {
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
};

const MainButton = ({ onPress, style, children }: MainButtonProps & PropsWithChildren) => {
  return (
    <Button
      mode="contained"
      onPress={onPress}
      buttonColor={COLORS.accent3}
      style={[{ borderRadius: 25 }, style]}
      contentStyle={{ paddingVertical: 5 }}>
      {children}
    </Button>
  );
};

export default MainButton;

const styles = StyleSheet.create({});
