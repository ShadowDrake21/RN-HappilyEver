import AuthBottomLink from '@components/auth/shared/AuthBottomLink';
import SignInSocials from '@components/auth/shared/AuthSocials';
import React from 'react';
import { View } from 'react-native';

const SignInBottom = () => {
  return (
    <View>
      <SignInSocials />
      <AuthBottomLink
        text="Don't have an account?"
        link={{ href: '/auth/sign-up', text: 'Sign Up' }}
      />
    </View>
  );
};

export default SignInBottom;
