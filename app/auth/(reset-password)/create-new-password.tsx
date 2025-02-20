import { useAuth, useSignIn } from '@clerk/clerk-expo';
import TouchableKeyboardAvoidingView from '@components/shared/TouchableKeyboardAvoidingView';
import CustomInput from '@components/ui/CustomInput';
import ErrorMessage from '@components/ui/ErrorMessage';
import MainButton from '@components/ui/MainButton';
import MediumTitle from '@components/ui/MediumTitle';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Image, useWindowDimensions, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { COLORS } from '~/constants/colors';
import { callToast } from '~/utils/ui.utils';

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
      password: '',
    },
  });
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const { signIn, isLoaded, setActive } = useSignIn();
  const { code } = useLocalSearchParams<{ code: string }>();
  const { isSignedIn } = useAuth();

  const setNewPassword = async () => {
    const { password } = getValues();
    const result = await signIn?.attemptFirstFactor({
      strategy: 'reset_password_email_code',
      code,
      password,
    });

    if (result?.status === 'complete') {
      setActive!({ session: result?.createdSessionId });
      callToast({
        type: 'success',
        text1: 'Password set successfully!',
        text2: 'Now you can login with your new password',
      });
    } else {
      console.error('Error setting new password', result);
    }
  };

  if (isSignedIn) {
    router.push('/');
  }

  if (!isLoaded) {
    return null;
  }

  return (
    <View className="flex-1 justify-between">
      <TouchableKeyboardAvoidingView offset={top + 200}>
        <View className="flex-1 justify-center gap-5">
          <MediumTitle>Set New Password</MediumTitle>
          <Image
            source={require('assets/set-password.jpg')}
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
                minLength: 6,
                maxLength: 30,
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomInput
                  errors={!!errors.password}
                  placeholder="Password"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  secureTextEntry={isPasswordHidden}
                  left={<TextInput.Icon icon="lock" size={24} color={COLORS.grayish} />}
                  right={
                    <TextInput.Icon
                      icon={isPasswordHidden ? 'eye-off' : 'eye'}
                      size={24}
                      color={COLORS.gray}
                      onPress={() => setIsPasswordHidden((prev) => !prev)}
                    />
                  }
                />
              )}
              name="password"
            />
            {errors.password?.type === 'maxLength' && (
              <ErrorMessage>Password must be shorter than 30 characters.</ErrorMessage>
            )}
            {errors.password?.type === 'minLength' && (
              <ErrorMessage>Password must be at least 6 characters long.</ErrorMessage>
            )}
            {errors.password?.type === 'required' && (
              <ErrorMessage>Password is required</ErrorMessage>
            )}
          </View>
          <MainButton onPress={handleSubmit(setNewPassword)} style={{ marginBottom: 20 }}>
            Save Password
          </MainButton>
        </View>
      </TouchableKeyboardAvoidingView>
    </View>
  );
};

export default Page;
