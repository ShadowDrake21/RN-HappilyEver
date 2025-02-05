import React, { PropsWithChildren } from 'react';
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { Button } from 'react-native-paper';

type GenderButtonProps = PropsWithChildren & {
  borderColor: ViewStyle['borderColor'];
  backgroundColor: ViewStyle['backgroundColor'];
  textColor: TextStyle['color'];
  onPress: () => void;
};

const GenderButton = ({
  children,
  borderColor,
  backgroundColor,
  textColor,
  onPress,
}: GenderButtonProps) => {
  return (
    <Button
      mode="contained"
      style={[styles.container, { borderColor }]}
      contentStyle={[
        styles.content,
        {
          backgroundColor,
        },
      ]}
      textColor={textColor?.toString()}
      onPress={onPress}>
      {children}
    </Button>
  );
};

export default GenderButton;

const styles = StyleSheet.create({
  container: {
    width: '50%',
    borderRadius: 40,
    borderWidth: 1,
  },
  content: {
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
});
