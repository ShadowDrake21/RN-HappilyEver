import TouchableKeyboardAvoidingView from '@components/shared/TouchableKeyboardAvoidingView';
import MainButton from '@components/ui/MainButton';
import React from 'react';
import { Control, FieldErrors } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import ResetPasswordContent from './ResetPasswordContent';
import SendCodeForm from './SendCodeForm';

type SendCodeProps = {
  control: Control<
    {
      email: string;
    },
    any
  >;
  errors: FieldErrors<{ email: string }>;
  onPress: () => void;
};

const SendCode = ({ control, errors, onPress }: SendCodeProps) => {
  const { top } = useSafeAreaInsets();

  return (
    <TouchableKeyboardAvoidingView offset={top + 200}>
      <View className="flex-1 justify-center gap-5">
        <ResetPasswordContent title="Get a Verification Code" imageUrl="send-code" />
        <SendCodeForm control={control} errors={errors} />
        <MainButton onPress={onPress} style={{ marginBottom: 20 }}>
          Send Code
        </MainButton>
      </View>
    </TouchableKeyboardAvoidingView>
  );
};

export default SendCode;

const styles = StyleSheet.create({});
