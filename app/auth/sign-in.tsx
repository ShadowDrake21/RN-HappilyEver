import SignInBottom from '@components/auth/sign-in/SignInBottom';
import SignInForm from '@components/auth/sign-in/SignInForm';
import CustomLoader from '@components/ui/CustomLoader';
import React from 'react';
import { ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import useSignInForm from '~/hooks/auth/sign-in/useSignInForm';

const Page = () => {
  const { bottom } = useSafeAreaInsets();
  const { control, errors, handleSubmit, isLoading, onSignIn } = useSignInForm();

  if (isLoading) {
    return <CustomLoader />;
  }

  return (
    <ScrollView
      contentContainerStyle={{
        paddingBottom: bottom,
        flex: 1,
      }}
      showsVerticalScrollIndicator={false}>
      <SignInForm control={control} errors={errors} onPress={handleSubmit(onSignIn)} />
      <SignInBottom />
    </ScrollView>
  );
};

export default Page;
