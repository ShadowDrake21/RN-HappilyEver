import React from 'react';
import { StyleProp, StyleSheet, TextStyle } from 'react-native';
import { TextInput, TextInputProps } from 'react-native-paper';

import { COLORS } from '~/constants/colors';

interface CustomInputProps extends TextInputProps {
  errors: boolean;
  addStyle?: StyleProp<TextStyle>;
}

const CustomInput = ({ errors, addStyle, ...props }: CustomInputProps) => {
  return (
    <TextInput
      style={[
        styles.input,
        addStyle,
        errors && {
          borderColor: COLORS.error,
        },
      ]}
      contentStyle={{ color: COLORS.light }}
      placeholderTextColor={COLORS.lightDark}
      {...props}
    />
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  input: {
    backgroundColor: COLORS.extraDark,
    borderWidth: 1,
    borderColor: 'transparent',
  },
});
