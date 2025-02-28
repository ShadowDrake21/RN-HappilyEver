import { useSignUp } from '@clerk/clerk-expo';
import { useCallback, useState } from 'react';

import { callToast } from '~/utils/ui.utils';

const useVerify = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { isLoaded, signUp, setActive } = useSignUp();

  const verifyUser = useCallback(
    async (code: string) => {
      if (!isLoaded) return;

      setIsLoading(true);

      try {
        const signUpAttempt = await signUp.attemptEmailAddressVerification({
          code,
        });

        await setActive({ session: signUpAttempt.createdSessionId });

        return true;
      } catch (err) {
        const errorObject = JSON.parse(JSON.stringify(err, null, 2));
        const longMessage = errorObject.errors?.[0]?.longMessage || 'An error occurred';
        console.error(JSON.stringify(err, null, 2));

        callToast({
          type: 'error',
          text1: 'Oops! 😕',
          text2: longMessage,
        });
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [isLoaded, signUp, setActive]
  );

  return { verifyUser, isLoading };
};

export default useVerify;
