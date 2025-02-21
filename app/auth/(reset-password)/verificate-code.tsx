import ResetPasswordContent from '@components/auth/reset-password/ResetPasswordContent';
import ConfirmationCodeField from '@components/confirmation-code-field/ConfirmationCodeField';
import TouchableKeyboardAvoidingView from '@components/shared/TouchableKeyboardAvoidingView';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import MainButton from '~/components/ui/MainButton';

const Page = () => {
  const router = useRouter();
  const { top, bottom } = useSafeAreaInsets();
  const [code, setCode] = useState('');

  const verificate = async () => {
    router.push({ pathname: '/auth/(reset-password)/create-new-password', params: { code } });
  };

  return (
    <View className="flex-1 justify-between" style={{ paddingBottom: bottom }}>
      <TouchableKeyboardAvoidingView offset={top + 120}>
        <View className="w-full flex-1 justify-center gap-5">
          <ResetPasswordContent title="Enter verification code" imageUrl="verificate-code" />
          <ConfirmationCodeField cellCount={6} setValue={setCode} value={code} />
          <MainButton onPress={verificate}>Verify</MainButton>
        </View>
      </TouchableKeyboardAvoidingView>
    </View>
  );
};

export default Page;
