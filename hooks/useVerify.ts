import { useSignUp } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { CustomAlert } from '~/utils/ui.utils';

const useVerify = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const verifyUser = useCallback(
    async (code: string) => {
      if (!isLoaded) return;

      setIsLoading(true);

      try {
        const signUpAttempt = await signUp.attemptEmailAddressVerification({
          code,
        });

        if (signUpAttempt.status === 'complete') {
          await setActive({ session: signUpAttempt.createdSessionId });
          router.replace('/');
        } else {
          console.error(JSON.stringify(signUpAttempt, null, 2));
        }
      } catch (err) {
        const errorObject = JSON.parse(JSON.stringify(err, null, 2));
        const longMessage = errorObject.errors?.[0]?.longMessage || 'An error occurred';
        CustomAlert({
          message: longMessage,
        });

        console.error(JSON.stringify(err, null, 2));
      } finally {
        setIsLoading(false);
      }
    },
    [isLoaded, signUp, setActive, router]
  );

  return { verifyUser, isLoading };
};

export default useVerify;
