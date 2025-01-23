import React from 'react';
import { FieldError } from 'react-hook-form';
import { StyleProp, StyleSheet, Text, TextStyle, View } from 'react-native';
import { TextInput, TextInputProps } from 'react-native-paper';

import { COLORS } from '~/constants/colors';

interface CustomInputProps extends TextInputProps {
  errors: FieldError | undefined;
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
  input: { backgroundColor: COLORS.extraDark, borderWidth: 1, borderColor: 'transparent' },
});
