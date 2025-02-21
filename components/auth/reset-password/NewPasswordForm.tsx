import CustomInput from '@components/ui/CustomInput';
import ErrorMessage from '@components/ui/ErrorMessage';
import React, { useState } from 'react';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { View } from 'react-native';
import { TextInput } from 'react-native-paper';

import { COLORS } from '~/constants/colors';

type NewPasswordFormProps = {
  control: Control<
    {
      password: string;
    },
    any
  >;
  errors: FieldErrors<{
    password: string;
  }>;
};

const NewPasswordForm = ({ control, errors }: NewPasswordFormProps) => {
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  return (
    <View>
      <Controller
        control={control}
        rules={{
          minLength: 6,
          maxLength: 30,
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <CustomInput
            errors={!!errors.password}
            placeholder="Password"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry={isPasswordHidden}
            left={<TextInput.Icon icon="lock" size={24} color={COLORS.grayish} />}
            right={
              <TextInput.Icon
                icon={isPasswordHidden ? 'eye-off' : 'eye'}
                size={24}
                color={COLORS.gray}
                onPress={() => setIsPasswordHidden((prev) => !prev)}
              />
            }
          />
        )}
        name="password"
      />
      {errors.password?.type === 'maxLength' && (
        <ErrorMessage>Password must be shorter than 30 characters.</ErrorMessage>
      )}
      {errors.password?.type === 'minLength' && (
        <ErrorMessage>Password must be at least 6 characters long.</ErrorMessage>
      )}
      {errors.password?.type === 'required' && <ErrorMessage>Password is required</ErrorMessage>}
    </View>
  );
};

export default NewPasswordForm;
