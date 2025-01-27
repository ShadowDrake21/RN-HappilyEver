import { useSignUp } from '@clerk/clerk-expo';
import { useCallback, useState } from 'react';

import { CustomAlert } from '~/utils/ui.utils';

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
        return true;
      } catch (err) {
        const errorObject = JSON.parse(JSON.stringify(err, null, 2));
        const longMessage = errorObject.errors?.[0]?.longMessage || 'An error occurred';
        console.error(JSON.stringify(err, null, 2));
        CustomAlert({
          message: longMessage,
        });
      } finally {
        setIsLoading(false);
      }
    },
    [isLoaded, signUp]
  );

  return { isLoading, signUpWithEmail };
};

export default useRegister;
