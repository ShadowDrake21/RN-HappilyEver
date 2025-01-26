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
import useSignUp from '~/hooks/useSignUp';
import { useAuthStore } from '~/store/store';
import { setAuthDataToStorage } from '~/utils/helpers.utils';

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

  const { loading, signUpWithEmail } = useSignUp();

  const { setUser } = useAuthStore();

  const onSubmit = async () => {
    const res = await signUpWithEmail(getValues('email'), getValues('password'));

    if (res) {
      setAuthDataToStorage(res.access_token, res.refresh_token, res.expires_in);
      setUser(res.user, true);
    }
  };

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
        <MainButton onPress={handleSubmit(onSubmit)} style={{ marginBottom: 20 }}>
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
