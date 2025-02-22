import AuthBottomLink from '@components/auth/shared/AuthBottomLink';
import AuthContent from '@components/auth/shared/AuthContent';
import AuthForm from '@components/auth/shared/AuthForm';
import SignInSocials from '@components/auth/shared/AuthSocials';
import ConfirmationCodeField from '@components/confirmation-code-field/ConfirmationCodeField';
import TouchableKeyboardAvoidingView from '@components/shared/TouchableKeyboardAvoidingView';
import CustomLoader from '@components/ui/CustomLoader';
import MediumTitle from '@components/ui/MediumTitle';
import React from 'react';
import { Image, ScrollView, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import MainButton from '~/components/ui/MainButton';
import useSignUp from '~/hooks/auth/sign-up/useSignUp';

const Page = () => {
  const { width } = useWindowDimensions();
  const { bottom, top } = useSafeAreaInsets();

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
    return (
      <TouchableKeyboardAvoidingView offset={top + 100}>
        <View className="flex-1 justify-center gap-5" style={{ paddingBottom: bottom }}>
          <MediumTitle style={{ paddingBottom: 0 }}>Enter verification code</MediumTitle>
          <Image
            source={require('assets/auth/verification-code.jpg')}
            style={{
              aspectRatio: 1,
              width,
              height: width - 40,
              alignSelf: 'center',
              borderRadius: 200,
              marginBottom: 20,
            }}
            resizeMode="cover"
          />
          <ConfirmationCodeField cellCount={6} setValue={setCode} value={code} />
          <MainButton onPress={onVerification}>Verify</MainButton>
        </View>
      </TouchableKeyboardAvoidingView>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={{
        paddingBottom: bottom,
        flex: 1,
      }}
      showsVerticalScrollIndicator={false}>
      <View className="flex-1 justify-between" style={{ paddingBottom: bottom }}>
        <TouchableKeyboardAvoidingView offset={top + 120}>
          <View className="flex-1 justify-center">
            <AuthContent title="Create Your Account" />
            <AuthForm control={control} errors={errors} />
            <MainButton onPress={handleSubmit(onSignUp)} style={{ marginBottom: 20 }}>
              Submit
            </MainButton>
          </View>
        </TouchableKeyboardAvoidingView>
        <View>
          <SignInSocials action="Sign up" />
          <AuthBottomLink
            text="Have already an account?"
            link={{ href: '/auth/sign-in', text: 'Sign In' }}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default Page;
