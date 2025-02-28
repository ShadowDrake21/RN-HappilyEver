import TouchableKeyboardAvoidingView from '@components/shared/TouchableKeyboardAvoidingView';
import MainButton from '@components/ui/MainButton';
import TextLink from '@components/ui/TextLink';
import React from 'react';
import { Control, FieldErrors } from 'react-hook-form';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import AuthContent from '../shared/AuthContent';
import AuthForm from '../shared/AuthForm';

import { AuthFormType } from '~/types/auth.types';

type SignInFormProps = {
  control: Control<AuthFormType, any>;
  errors: FieldErrors<AuthFormType>;
  onPress: () => void;
};

const SignInForm = ({ control, errors, onPress }: SignInFormProps) => {
  const { top } = useSafeAreaInsets();

  return (
    <TouchableKeyboardAvoidingView offset={top + 120}>
      <View className="flex-1 justify-center">
        <AuthContent title="Login to Your Account" />
        <AuthForm control={control} errors={errors} />
        <MainButton onPress={onPress} style={{ marginBottom: 20 }}>
          Submit
        </MainButton>
        <TextLink
          classes="flex-row items-center justify-center gap-2 self-center"
          href="/auth/(reset-password)">
          Don't remember your password?
        </TextLink>
      </View>
    </TouchableKeyboardAvoidingView>
  );
};

export default SignInForm;
