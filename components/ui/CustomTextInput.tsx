import React from 'react';
import { FieldError } from 'react-hook-form';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
} from 'react-native';

import { COLORS } from '~/constants/colors';

interface CustomInputProps extends TextInputProps {
  errors: FieldError | undefined;
  addStyle?: StyleProp<TextStyle>;
  height?: number;
}

const CustomTextArea = ({ errors, addStyle, height, ...props }: CustomInputProps) => {
  return (
    <TextInput
      style={[
        styles.input,
        addStyle,
        { height },
        errors && {
          borderColor: COLORS.error,
        },
      ]}
      placeholderTextColor={COLORS.lightDark}
      multiline
      autoCorrect={false}
      textBreakStrategy="balanced"
      lineBreakStrategyIOS="push-out"
      {...props}
    />
  );
};

export default CustomTextArea;

const styles = StyleSheet.create({
  input: {
    backgroundColor: COLORS.extraDark,
    borderWidth: 1,
    borderColor: 'transparent',
    padding: 10,
    fontSize: 16,
    color: COLORS.light,
  },
});
