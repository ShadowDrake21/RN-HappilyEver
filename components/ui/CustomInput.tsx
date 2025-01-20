import React from 'react';
import { FieldError } from 'react-hook-form';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput, TextInputProps } from 'react-native-paper';

import { COLORS } from '~/constants/colors';

interface CustomInputProps extends TextInputProps {
  errors: FieldError | undefined;
}

const CustomInput = ({ errors, ...props }: CustomInputProps) => {
  return (
    <TextInput
      style={[
        styles.input,
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
