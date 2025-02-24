import { useSignIn } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';

import { callToast } from '~/utils/ui.utils';

type SetNewPasswordParams = {
  code: string;
  password: string;
};

const useSetNewPassword = () => {
  const router = useRouter();
  const { signIn, setActive } = useSignIn();

  const setNewPassword = async ({ code, password }: SetNewPasswordParams) => {
    try {
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
    } catch (error) {
      console.error(error);

      callToast({
        type: 'error',
        text1:
          (error as { message: string }).message ||
          'An unexpected error occurred. Please try again.',
        text2: 'Please try again',
      });
      router.replace('/auth/sign-in');
    }
  };

  return { setNewPassword };
};

export default useSetNewPassword;
