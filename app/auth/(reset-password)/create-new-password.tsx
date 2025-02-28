import { useAuth, useSignIn } from '@clerk/clerk-expo';
import NewPassword from '@components/auth/reset-password/NewPassword';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';

import useSetNewPassword from '~/hooks/auth/reset-password/useSetNewPassword';

const Page = () => {
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

  const onSave = () => setNewPassword({ code, password: getValues('password') });

  if (isSignedIn) {
    router.push('/');
  }

  if (!isLoaded) {
    return null;
  }

  return (
    <View className="flex-1 justify-between">
      <NewPassword control={control} errors={errors} onPress={handleSubmit(onSave)} />
    </View>
  );
};

export default Page;
