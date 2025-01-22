import React, { PropsWithChildren } from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { Button } from 'react-native-paper';

import { COLORS } from '~/constants/colors';

type MainButtonProps = {
  onPress: () => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
};

const MainButton = ({
  onPress,
  style,
  disabled,
  children,
}: MainButtonProps & PropsWithChildren) => {
  return (
    <Button
      mode="contained"
      onPress={onPress}
      buttonColor={COLORS.accent3}
      style={[{ borderRadius: 25 }, style]}
      contentStyle={{ paddingVertical: 5 }}
      disabled={disabled}>
      {children}
    </Button>
  );
};

export default MainButton;

const styles = StyleSheet.create({});
