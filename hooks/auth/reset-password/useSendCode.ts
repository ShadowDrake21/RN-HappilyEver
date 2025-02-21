import { useSignIn } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';

import { callToast } from '~/utils/ui.utils';

const useSendCode = () => {
  const router = useRouter();
  const { signIn } = useSignIn();

  const sendCode = async (email: string) => {
    signIn
      ?.create({
        strategy: 'reset_password_email_code',
        identifier: email,
      })
      .then((_) => {
        router.push('/auth/(reset-password)/verificate-code');
      })
      .catch((error) => {
        callToast({
          type: 'error',
          text1: 'Error sending code',
          text2: error.errors[0].longMessage,
        });
      });
  };

  return { sendCode };
};

export default useSendCode;
