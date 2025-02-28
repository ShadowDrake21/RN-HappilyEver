import { useSignUp } from '@clerk/clerk-expo';
import { useCallback, useState } from 'react';

import { callToast } from '~/utils/ui.utils';

const useRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { isLoaded, signUp } = useSignUp();

  const signUpWithEmail = useCallback(
    async (email: string, password: string) => {
      if (!isLoaded) return;

      setIsLoading(true);
      try {
        await signUp.create({
          emailAddress: email,
          password,
        });
        await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
        callToast({
          type: 'success',
          text1: 'You are almost there!',
          text2: 'Verification code has been sent to your email',
        });
        return true;
      } catch (err) {
        const errorObject = JSON.parse(JSON.stringify(err, null, 2));
        const longMessage =
          errorObject.errors?.[0]?.longMessage.split('.')[0] + '.' || 'An error occurred';
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
    [isLoaded, signUp]
  );

  return { isLoading, signUpWithEmail };
};

export default useRegister;
