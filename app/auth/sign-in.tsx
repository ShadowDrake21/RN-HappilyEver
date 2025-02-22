import AuthBottomLink from '@components/auth/shared/AuthBottomLink';
import AuthContent from '@components/auth/shared/AuthContent';
import AuthForm from '@components/auth/shared/AuthForm';
import SignInSocials from '@components/auth/shared/AuthSocials';
import TouchableKeyboardAvoidingView from '@components/shared/TouchableKeyboardAvoidingView';
import CustomLoader from '@components/ui/CustomLoader';
import React from 'react';
import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import MainButton from '~/components/ui/MainButton';
import TextLink from '~/components/ui/TextLink';
import useSignInForm from '~/hooks/auth/sign-in/useSignInForm';

const Page = () => {
  const { top, bottom } = useSafeAreaInsets();
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
      <TouchableKeyboardAvoidingView offset={top + 120}>
        <View className="flex-1 justify-center">
          <AuthContent title="Login to Your Account" />
          <AuthForm control={control} errors={errors} />
          <MainButton onPress={handleSubmit(onSignIn)} style={{ marginBottom: 20 }}>
            Submit
          </MainButton>
          <TextLink
            classes="flex-row items-center justify-center gap-2 self-center"
            href="/auth/(reset-password)">
            Don't remember your password?
          </TextLink>
        </View>
      </TouchableKeyboardAvoidingView>
      <View>
        <SignInSocials />
        <AuthBottomLink
          text="Don't have an account?"
          link={{ href: '/auth/sign-up', text: 'Sign Up' }}
        />
      </View>
    </ScrollView>
  );
};

export default Page;
