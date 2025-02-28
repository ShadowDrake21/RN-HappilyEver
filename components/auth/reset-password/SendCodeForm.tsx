import CustomInput from '@components/ui/CustomInput';
import ErrorMessage from '@components/ui/ErrorMessage';
import React from 'react';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { View } from 'react-native';
import { TextInput } from 'react-native-paper';

import { COLORS } from '~/constants/colors';

type SendCodeFormProps = {
  control: Control<
    {
      email: string;
    },
    any
  >;
  errors: FieldErrors<{
    email: string;
  }>;
};

const SendCodeForm = ({ control, errors }: SendCodeFormProps) => {
  return (
    <View>
      <Controller
        control={control}
        rules={{
          required: true,
          pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <CustomInput
            errors={!!errors.email}
            placeholder="Email"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            left={<TextInput.Icon icon="email" size={24} color={COLORS.grayish} />}
            autoCapitalize="none"
          />
        )}
        name="email"
      />
      {errors.email?.type === 'required' && <ErrorMessage>Email is required.</ErrorMessage>}
      {errors.email?.type === 'pattern' && <ErrorMessage>Invalid email.</ErrorMessage>}
    </View>
  );
};

export default SendCodeForm;
