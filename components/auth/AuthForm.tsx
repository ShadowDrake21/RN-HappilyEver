import React, { useState } from 'react';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { View } from 'react-native';
import { Checkbox, TextInput } from 'react-native-paper';

import CustomInput from '../ui/CustomInput';
import ErrorMessage from '../ui/ErrorMessage';

import { COLORS } from '~/constants/colors';

type AuthFormProps = {
  control: Control<
    {
      email: string;
      password: string;
      rememberMe: boolean;
    },
    any
  >;
  errors: FieldErrors<{
    email: string;
    password: string;
    rememberMe: boolean;
  }>;
};

const AuthForm = ({ control, errors }: AuthFormProps) => {
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  return (
    <>
      <View className="gap-6">
        <View>
          <Controller
            control={control}
            rules={{
              required: true,
              pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomInput
                errors={errors.email}
                placeholder="Email"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                left={<TextInput.Icon icon="email" size={24} color={COLORS.grayish} />}
              />
            )}
            name="email"
          />
          {errors.email?.type === 'required' && <ErrorMessage>Email is required.</ErrorMessage>}
          {errors.email?.type === 'pattern' && <ErrorMessage>Invalid email.</ErrorMessage>}
        </View>
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
                errors={errors.password}
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
          {errors.password?.type === 'required' && (
            <ErrorMessage>Password is required</ErrorMessage>
          )}
        </View>
      </View>
      <View className="flex-row items-center justify-between self-center py-3">
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <Checkbox.Item
              label="Remember me"
              status={value ? 'checked' : 'unchecked'}
              onPress={() => onChange(!value)}
              color={COLORS.mainPurple}
              labelStyle={{ color: COLORS.light }}
            />
          )}
          name="rememberMe"
        />
      </View>
    </>
  );
};

export default AuthForm;
