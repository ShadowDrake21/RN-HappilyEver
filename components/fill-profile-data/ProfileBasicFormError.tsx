import React from 'react';
import { FieldError } from 'react-hook-form';
import { StyleProp, StyleSheet, Text, TextStyle } from 'react-native';

const ProfileBasicFormError = ({
  error,
  style,
}: {
  error: FieldError;
  style?: StyleProp<TextStyle>;
}) => {
  return <Text style={[styles.errorText, style]}>{error.message}</Text>;
};

export default ProfileBasicFormError;

const styles = StyleSheet.create({
  errorText: {
    color: 'red',
    marginTop: 4,
  },
});
