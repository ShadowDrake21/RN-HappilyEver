import { useAuth, useSession, useSignIn, useUser } from '@clerk/clerk-expo';
import TouchableKeyboardAvoidingView from '@components/shared/TouchableKeyboardAvoidingView';
import CustomInput from '@components/ui/CustomInput';
import ErrorMessage from '@components/ui/ErrorMessage';
import MainButton from '@components/ui/MainButton';
import MediumTitle from '@components/ui/MediumTitle';
import { useRouter } from 'expo-router';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Image, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { COLORS } from '~/constants/colors';

const Page = () => {
  const { top } = useSafeAreaInsets();
  const router = useRouter();
  const { width } = useWindowDimensions();
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
    },
  });
  const { signIn } = useSignIn();

  const sendCode = async () => {
    const { email } = getValues();
    signIn
      ?.create({
        strategy: 'reset_password_email_code',
        identifier: email,
      })
      .then((_) => {
        router.push('/auth/(reset-password)/verificate-code');
      })
      .catch((error) => {
        console.error('Error sending code', error.errors[0].longMessage);
      });
  };

  return (
    <View className="flex-1 justify-between">
      <TouchableKeyboardAvoidingView offset={top + 200}>
        <View className="flex-1 justify-center gap-5">
          <MediumTitle>Login to Your Account</MediumTitle>
          <Image
            source={require('assets/send-code.jpg')}
            style={{
              aspectRatio: 1,
              width,
              height: width - 40,
              alignSelf: 'center',
              marginBottom: 20,
            }}
            className=" rounded-full"
            resizeMode="cover"
          />
          <View>
            <Controller
              control={control}
              rules={{
                required: true,
                pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomInput
                  errors={!!errors.email}
                  placeholder="Email"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  left={<TextInput.Icon icon="email" size={24} color={COLORS.grayish} />}
                  autoCapitalize="none"
                />
              )}
              name="email"
            />
            {errors.email?.type === 'required' && <ErrorMessage>Email is required.</ErrorMessage>}
            {errors.email?.type === 'pattern' && <ErrorMessage>Invalid email.</ErrorMessage>}
          </View>
          <MainButton onPress={handleSubmit(sendCode)} style={{ marginBottom: 20 }}>
            Send Code
          </MainButton>
        </View>
      </TouchableKeyboardAvoidingView>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({});
