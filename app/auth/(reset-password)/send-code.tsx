import SendCode from '@components/auth/reset-password/SendCode';
import React from 'react';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';

import useSendCode from '~/hooks/auth/reset-password/useSendCode';

const Page = () => {
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
      <SendCode control={control} errors={errors} onPress={handleSubmit(onSend)} />
    </View>
  );
};

export default Page;
