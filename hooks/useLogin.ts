import { useSignIn } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import { useCallback, useState } from 'react';

import { CustomAlert } from '~/utils/ui.utils';

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const signInWithEmail = useCallback(
    async (email: string, password: string) => {
      setLoading(true);

      if (!isLoaded) return;

      try {
        const signInAttempt = await signIn.create({
          identifier: email,
          password,
        });

        await setActive({ session: signInAttempt.createdSessionId });
        router.replace('/home');
      } catch (err) {
        const errorObject = JSON.parse(JSON.stringify(err, null, 2));
        const longMessage = errorObject.errors?.[0]?.longMessage || 'An error occurred';
        console.error(JSON.stringify(err, null, 2));
        CustomAlert({
          message: longMessage,
        });
      } finally {
        setLoading(false);
      }
    },
    [isLoaded, router]
  );

  return { loading, signInWithEmail };
};

export default useLogin;
