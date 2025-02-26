import React, { PropsWithChildren } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
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
      style={[{ borderRadius: 25, zIndex: 100 }, style]}
      contentStyle={{ paddingVertical: 5 }}
      disabled={disabled}>
      {children}
    </Button>
  );
};

export default MainButton;
