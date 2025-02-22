import TouchableKeyboardAvoidingView from '@components/shared/TouchableKeyboardAvoidingView';
import MainButton from '@components/ui/MainButton';
import React from 'react';
import { Control, FieldErrors } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import NewPasswordForm from './NewPasswordForm';
import ResetPasswordContent from './ResetPasswordContent';

type NewPasswordProps = {
  control: Control<
    {
      password: string;
    },
    any
  >;
  errors: FieldErrors<{ password: string }>;
  onPress: () => void;
};

const NewPassword = ({ control, errors, onPress }: NewPasswordProps) => {
  const { top } = useSafeAreaInsets();

  return (
    <TouchableKeyboardAvoidingView offset={top + 200}>
      <View className="flex-1 justify-center gap-5">
        <ResetPasswordContent title="Set New Password" imageUrl="set-password" />
        <NewPasswordForm control={control} errors={errors} />
        <MainButton onPress={onPress} style={{ marginBottom: 20 }}>
          Save Password
        </MainButton>
      </View>
    </TouchableKeyboardAvoidingView>
  );
};

export default NewPassword;

const styles = StyleSheet.create({});
