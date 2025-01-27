import ConfirmationCodeField from '@components/confirmation-code-field/ConfirmationCodeField';
import TouchableKeyboardAvoidingView from '@components/shared/TouchableKeyboardAvoidingView';
import CustomLoader from '@components/ui/CustomLoader';
import MediumTitle from '@components/ui/MediumTitle';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Image, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import AuthForm from '~/components/auth/AuthForm';
import SignInSocials from '~/components/auth/AuthSocials';
import MainButton from '~/components/ui/MainButton';
import TextLink from '~/components/ui/TextLink';
import { COLORS } from '~/constants/colors';
import useRegister from '~/hooks/useRegister';
import useVerify from '~/hooks/useVerify';
import { callToast } from '~/utils/ui.utils';

const Page = () => {
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const { bottom, top } = useSafeAreaInsets();
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState('');

  const { isLoading: signUpLoading, signUpWithEmail } = useRegister();
  const { isLoading: verificationLoading, verifyUser } = useVerify();

  const onSignUp = async () => {
    const { email, password } = getValues();
    const success = await signUpWithEmail(email, password);
    setPendingVerification(success || false);
  };

  const onVerification = async () => {
    const success = await verifyUser(code);
    if (success) {
      callToast({
        type: 'success',
        text1: 'Congratulations! 🎉',
        text2: 'Account verified successfully',
      });
    }
  };

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
              height: 400,
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
    <View className="flex-1 justify-between" style={{ paddingBottom: bottom }}>
      <View>
        <Image
          source={require('assets/logo.png')}
          className="h-[200px] w-[200px] self-center"
          resizeMode="contain"
        />
        <MediumTitle>Create Your Account</MediumTitle>
        <AuthForm control={control} errors={errors} />
        <MainButton onPress={handleSubmit(onSignUp)} style={{ marginBottom: 20 }}>
          Submit
        </MainButton>
      </View>
      <View>
        <SignInSocials action="Sign up" />
        <View className="flex-row items-center justify-center gap-2 self-center py-5 ">
          <Text style={{ color: COLORS.text }}>Have already an account?</Text>
          <TextLink href="./sign-in">Sign in</TextLink>
        </View>
      </View>
    </View>
  );
};

export default Page;
