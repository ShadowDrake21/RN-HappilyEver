import { useSignUp } from '@clerk/clerk-expo';
import ConfirmationCodeField from '@components/ConfirmationCodeField';
import TouchableKeyboardAvoidingView from '@components/shared/TouchableKeyboardAvoidingView';
import CustomLoader from '@components/ui/CustomLoader';
import MediumTitle from '@components/ui/MediumTitle';
import { useHeaderHeight } from '@react-navigation/elements';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Image, KeyboardAvoidingView, Platform, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import AuthForm from '~/components/auth/AuthForm';
import SignInSocials from '~/components/auth/AuthSocials';
import MainButton from '~/components/ui/MainButton';
import TextLink from '~/components/ui/TextLink';
import { COLORS } from '~/constants/colors';
import { useAuthStore } from '~/store/store';
import { setAuthDataToStorage } from '~/utils/helpers.utils';
import { CustomAlert } from '~/utils/ui.utils';

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

  const { isLoaded, signUp, setActive } = useSignUp();

  const router = useRouter();
  const { bottom, top } = useSafeAreaInsets();
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const height = useHeaderHeight();

  const onSignUp = async () => {
    if (!isLoaded) return;

    setIsLoading(true);
    // Start sign-up process using email and password provided
    try {
      await signUp.create({
        emailAddress: getValues('email'),
        password: getValues('password'),
      });

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });

      // Set 'pendingVerification' to true to display second form
      // and capture OTP code
      setPendingVerification(true);
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      const errorObject = JSON.parse(JSON.stringify(err, null, 2));
      const longMessage = errorObject.errors?.[0]?.longMessage || 'An error occurred';
      console.error(JSON.stringify(err, null, 2));
      CustomAlert({
        message: longMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <CustomLoader />;
  }

  const onVerification = async () => {
    if (!isLoaded) return;

    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (signUpAttempt.status === 'complete') {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.replace('/');
      } else {
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err) {
      const errorObject = JSON.parse(JSON.stringify(err, null, 2));
      const longMessage = errorObject.errors?.[0]?.longMessage || 'An error occurred';

      CustomAlert({
        message: longMessage,
      });

      console.error(JSON.stringify(err, null, 2));
    }
  };

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
