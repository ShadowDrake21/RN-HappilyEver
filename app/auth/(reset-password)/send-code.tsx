import ResetPasswordContent from '@components/auth/reset-password/ResetPasswordContent';
import SendCodeForm from '@components/auth/reset-password/SendCodeForm';
import TouchableKeyboardAvoidingView from '@components/shared/TouchableKeyboardAvoidingView';
import MainButton from '@components/ui/MainButton';
import React from 'react';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import useSendCode from '~/hooks/auth/reset-password/useSendCode';

const Page = () => {
  const { top } = useSafeAreaInsets();
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
    },
  });

  const { sendCode } = useSendCode();

  const onSend = async () => {
    await sendCode(getValues('email'));
  };

  return (
    <View className="flex-1 justify-between">
      <TouchableKeyboardAvoidingView offset={top + 200}>
        <View className="flex-1 justify-center gap-5">
          <ResetPasswordContent title="Get a Verification Code" imageUrl="send-code" />
          <SendCodeForm control={control} errors={errors} />
          <MainButton onPress={handleSubmit(onSend)} style={{ marginBottom: 20 }}>
            Send Code
          </MainButton>
        </View>
      </TouchableKeyboardAvoidingView>
    </View>
  );
};

export default Page;
