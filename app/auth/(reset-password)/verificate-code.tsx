import MediumTitle from '@components/ui/MediumTitle';
import React from 'react';
import { useForm } from 'react-hook-form';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Text as PaperText } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import AuthForm from '~/components/auth/AuthForm';
import SignInSocials from '~/components/auth/AuthSocials';
import MainButton from '~/components/ui/MainButton';
import TextLink from '~/components/ui/TextLink';
import { COLORS } from '~/constants/colors';
import { defaultTitleStyles } from '~/constants/styles';
import { supabase } from '~/utils/supabase';

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

  const onSubmit = async () => {
    await supabase.auth.resetPasswordForEmail(getValues('email'));
  };

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
        <MainButton onPress={handleSubmit(onSubmit)} style={{ marginBottom: 20 }}>
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
