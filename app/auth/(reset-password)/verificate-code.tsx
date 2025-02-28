import ResetPasswordContent from '@components/auth/reset-password/ResetPasswordContent';
import VerificateCode from '@components/auth/reset-password/VerificateCode';
import ConfirmationCodeField from '@components/confirmation-code-field/ConfirmationCodeField';
import TouchableKeyboardAvoidingView from '@components/shared/TouchableKeyboardAvoidingView';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Page = () => {
  const router = useRouter();
  const { bottom } = useSafeAreaInsets();
  const [code, setCode] = useState('');

  const verificate = async () => {
    router.push({ pathname: '/auth/(reset-password)/create-new-password', params: { code } });
  };

  return (
    <View className="flex-1 justify-between" style={{ paddingBottom: bottom }}>
      <VerificateCode code={code} setCode={setCode} onPress={verificate} />
    </View>
  );
};

export default Page;
