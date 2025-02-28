import { useSignIn } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import { useCallback, useState } from 'react';

import { callToast } from '~/utils/ui.utils';

const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const signInWithEmail = useCallback(
    async (email: string, password: string) => {
      setIsLoading(true);

      if (!isLoaded) return;

      try {
        const signInAttempt = await signIn.create({
          identifier: email,
          password,
        });
        await setActive({ session: signInAttempt.createdSessionId });
      } catch (err) {
        const errorObject = JSON.parse(JSON.stringify(err, null, 2));
        const longMessage = errorObject.errors?.[0]?.longMessage || 'An error occurred';
        console.error(JSON.stringify(err, null, 2));

        callToast({
          type: 'error',
          text1: 'Oops! 😕',
          text2: longMessage,
        });
      } finally {
        setIsLoading(false);
      }
    },
    [isLoaded, router]
  );

  return { isLoading, signInWithEmail };
};

export default useLogin;
