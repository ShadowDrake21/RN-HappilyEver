import SignInSocials from '@components/auth/shared/AuthSocials';
import React from 'react';
import { View } from 'react-native';

import AuthBottomLink from '../shared/AuthBottomLink';

const SignUpBottom = () => {
  return (
    <View>
      <SignInSocials action="Sign up" />
      <AuthBottomLink
        text="Have already an account?"
        link={{ href: '/auth/sign-in', text: 'Sign In' }}
      />
    </View>
  );
};

export default SignUpBottom;
