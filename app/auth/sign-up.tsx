import React from 'react';
import { useForm } from 'react-hook-form';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Text as PaperText } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import SignInForm from '~/components/auth/AuthForm';
import SignInSocials from '~/components/auth/AuthSocials';
import MainButton from '~/components/ui/MainButton';
import TextLink from '~/components/ui/TextLink';
import { COLORS } from '~/constants/colors';
import useSignIn from '~/hooks/useSignIn';
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

  const { loading, signInWithEmail } = useSignIn({
    email: getValues('email'),
    password: getValues('password'),
  });

  const onSubmit = (data: any) => console.log(data);

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
        <SignInForm control={control} errors={errors} />
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
