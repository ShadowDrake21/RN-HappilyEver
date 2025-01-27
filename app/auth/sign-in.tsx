import { useSignIn } from '@clerk/clerk-expo';
import MediumTitle from '@components/ui/MediumTitle';
import { useRouter } from 'expo-router';
import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { Image, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import AuthForm from '~/components/auth/AuthForm';
import SignInSocials from '~/components/auth/AuthSocials';
import MainButton from '~/components/ui/MainButton';
import TextLink from '~/components/ui/TextLink';
import { COLORS } from '~/constants/colors';
import { CustomAlert } from '~/utils/ui.utils';

const Page = () => {
  const { bottom } = useSafeAreaInsets();
  const router = useRouter();
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

  const { signIn, setActive, isLoaded } = useSignIn();

  const onSubmit = async () => {};

  const onSignIn = useCallback(async () => {
    if (!isLoaded) return;

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: getValues('email'),
        password: getValues('password'),
      });

      await setActive({ session: signInAttempt.createdSessionId });
      router.replace('/home');
    } catch (err) {
      const errorObject = JSON.parse(JSON.stringify(err, null, 2));
      const longMessage = errorObject.errors?.[0]?.longMessage || 'An error occurred';
      console.error(JSON.stringify(err, null, 2));
      CustomAlert({
        message: longMessage,
      });
    }
  }, [isLoaded, getValues('email'), getValues('password')]);

  return (
    <View className="flex-1 justify-between" style={{ paddingBottom: bottom }}>
      <View>
        <Image
          source={require('assets/logo.png')}
          className="h-[200px] w-[200px] self-center"
          resizeMode="contain"
        />
        <MediumTitle>Login to Your Account</MediumTitle>
        <AuthForm control={control} errors={errors} />
        <MainButton onPress={handleSubmit(onSignIn)} style={{ marginBottom: 20 }}>
          Submit
        </MainButton>
        {/* disabled={getFieldState('email').invalid || getFieldState('password').invalid} */}
        <TextLink
          classes="flex-row items-center justify-center gap-2 self-center"
          href="./reset-password">
          Don't remember your password?
        </TextLink>
      </View>
      <View>
        <SignInSocials />
        <View className="flex-row items-center justify-center gap-2 self-center py-5 ">
          <Text style={{ color: COLORS.text }}>Don't have a profile?</Text>
          <TextLink href="./sign-up">Sign up</TextLink>
        </View>
      </View>
    </View>
  );
};

export default Page;
