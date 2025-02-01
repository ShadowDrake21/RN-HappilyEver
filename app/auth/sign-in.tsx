import CustomLoader from '@components/ui/CustomLoader';
import MediumTitle from '@components/ui/MediumTitle';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Image, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import AuthForm from '~/components/auth/AuthForm';
import SignInSocials from '~/components/auth/AuthSocials';
import MainButton from '~/components/ui/MainButton';
import TextLink from '~/components/ui/TextLink';
import { COLORS } from '~/constants/colors';
import useLogin from '~/hooks/useLogin';
import useMainSettingsOperations from '~/hooks/useMainSettingsOperations';
import { getProfileSettingsFilledOut } from '~/supabase/supabase-typed.requests';
import { callToast } from '~/utils/ui.utils';

const Page = () => {
  const { bottom } = useSafeAreaInsets();
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

  const { isLoading, signInWithEmail } = useLogin();

  const onSignIn = async () => {
    const { email, password } = getValues();
    await signInWithEmail(email, password);
  };

  if (isLoading) {
    return <CustomLoader />;
  }

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
