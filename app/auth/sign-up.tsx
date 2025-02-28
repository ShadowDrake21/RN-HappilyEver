import PendingVerification from '@components/auth/sign-up/PendingVerification';
import SignUpBottom from '@components/auth/sign-up/SignUpBottom';
import SignUpForm from '@components/auth/sign-up/SignUpForm';
import CustomLoader from '@components/ui/CustomLoader';
import React from 'react';
import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import useSignUp from '~/hooks/auth/sign-up/useSignUp';

const Page = () => {
  const { bottom } = useSafeAreaInsets();

  const {
    code,
    setCode,
    signUpLoading,
    verificationLoading,
    pendingVerification,
    onSignUp,
    onVerification,
    errors,
    control,
    handleSubmit,
  } = useSignUp();

  if (signUpLoading || verificationLoading) {
    return <CustomLoader />;
  }

  if (pendingVerification) {
    return <PendingVerification code={code} setCode={setCode} onVerification={onVerification} />;
  }

  return (
    <ScrollView
      contentContainerStyle={{
        paddingBottom: bottom,
        flex: 1,
      }}
      showsVerticalScrollIndicator={false}>
      <View className="flex-1 justify-between" style={{ paddingBottom: bottom }}>
        <SignUpForm control={control} errors={errors} onPress={handleSubmit(onSignUp)} />
        <SignUpBottom />
      </View>
    </ScrollView>
  );
};

export default Page;
