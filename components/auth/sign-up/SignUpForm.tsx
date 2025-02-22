import TouchableKeyboardAvoidingView from '@components/shared/TouchableKeyboardAvoidingView';
import MainButton from '@components/ui/MainButton';
import React from 'react';
import { Control, FieldErrors } from 'react-hook-form';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import AuthContent from '../shared/AuthContent';
import AuthForm from '../shared/AuthForm';

import { AuthFormType } from '~/types/auth.types';

type SignUpFormProps = {
  control: Control<AuthFormType, any>;
  errors: FieldErrors<AuthFormType>;
  onPress: () => void;
};

const SignUpForm = ({ control, errors, onPress }: SignUpFormProps) => {
  const { top } = useSafeAreaInsets();

  return (
    <TouchableKeyboardAvoidingView offset={top + 120}>
      <View className="flex-1 justify-center">
        <AuthContent title="Create Your Account" />
        <AuthForm control={control} errors={errors} />
        <MainButton onPress={onPress} style={{ marginBottom: 20 }}>
          Submit
        </MainButton>
      </View>
    </TouchableKeyboardAvoidingView>
  );
};

export default SignUpForm;
