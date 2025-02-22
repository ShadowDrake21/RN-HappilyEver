import SendCode from '@components/auth/reset-password/SendCode';
import React from 'react';
import { View } from 'react-native';

import useSendCode from '~/hooks/auth/reset-password/useSendCode';
import useSendCodeForm from '~/hooks/auth/reset-password/useSendCodeForm';

const Page = () => {
  const { control, errors, getValues, handleSubmit } = useSendCodeForm();
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
