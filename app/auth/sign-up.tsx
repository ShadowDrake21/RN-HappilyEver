import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Image, StyleSheet, Text, View, AppStateStatus, AppState } from 'react-native';
import { Text as PaperText } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import AuthForm from '~/components/auth/AuthForm';
import SignInSocials from '~/components/auth/AuthSocials';
import MainButton from '~/components/ui/MainButton';
import TextLink from '~/components/ui/TextLink';
import { COLORS } from '~/constants/colors';
import useSignIn from '~/hooks/useSignIn';
import useSignUp from '~/hooks/useSignUp';
import LocalTokenStorage from '~/storage/LocalTokenStorage';
import { useAuthStore } from '~/store/store';
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

  const { loading, signUpWithEmail } = useSignUp();

  const { setUser } = useAuthStore();

  const onSubmit = async () => {
    const res = await signUpWithEmail(getValues('email'), getValues('password'));

    if (res) {
      // setUserPersistence(
      //   res.refresh_token,
      //   res.expires_at || new Date(new Date().getHours() + 60 * 60 * 1000).getTime()
      // );
      await LocalTokenStorage.setAccessToken(res.access_token);
      await LocalTokenStorage.setRefreshToken(res.refresh_token);
      setUser(res.user);
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
        <PaperText variant="headlineMedium" style={styles.title}>
          Create Your Account
        </PaperText>
        <AuthForm control={control} errors={errors} />
        <MainButton onPress={handleSubmit(onSubmit)} style={{ marginBottom: 20 }}>
          Submit
        </MainButton>
        {/* disabled={getFieldState('email').invalid || getFieldState('password').invalid} */}
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

const styles = StyleSheet.create({
  title: {
    color: COLORS.text,
    fontFamily: 'Poppins-Regular',
    fontWeight: '600',
    textAlign: 'center',
    paddingBottom: 20,
  },
});
