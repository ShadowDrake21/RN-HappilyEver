import { useAuth, useSignIn } from '@clerk/clerk-expo';
import NewPasswordForm from '@components/auth/reset-password/NewPasswordForm';
import ResetPasswordContent from '@components/auth/reset-password/ResetPasswordContent';
import TouchableKeyboardAvoidingView from '@components/shared/TouchableKeyboardAvoidingView';
import MainButton from '@components/ui/MainButton';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import useSetNewPassword from '~/hooks/auth/reset-password/useSetNewPassword';

const Page = () => {
  const { top } = useSafeAreaInsets();
  const router = useRouter();
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
  const { isLoaded } = useSignIn();
  const { code } = useLocalSearchParams<{ code: string }>();
  const { isSignedIn } = useAuth();
  const { setNewPassword } = useSetNewPassword();

  const onSave = () => setNewPassword(code, getValues('password'));

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
          <ResetPasswordContent title="Set New Password" imageUrl="set-password" />
          <NewPasswordForm control={control} errors={errors} />
          <MainButton onPress={handleSubmit(onSave)} style={{ marginBottom: 20 }}>
            Save Password
          </MainButton>
        </View>
      </TouchableKeyboardAvoidingView>
    </View>
  );
};

export default Page;
