import { useSignIn } from '@clerk/clerk-expo';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { callToast } from '~/utils/ui.utils';

const useSetNewPassword = () => {
  const { signIn, setActive } = useSignIn();

  const setNewPassword = async (code: string, password: string) => {
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
      callToast({
        type: 'error',
        text1: 'Error setting new password',
        text2: 'Please try again',
      });
    }
  };

  return { setNewPassword };
};

export default useSetNewPassword;
