import { useState } from 'react';
import { useForm } from 'react-hook-form';

import useRegister from '../useRegister';
import useVerify from '../useVerify';

import { useUserStorage } from '~/store/user.store';
import { AuthFormType } from '~/types/auth.types';
import { callToast } from '~/utils/ui.utils';

const useSignUp = () => {
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState('');
  const { setIsNewUser } = useUserStorage();

  const { isLoading: signUpLoading, signUpWithEmail } = useRegister();
  const { isLoading: verificationLoading, verifyUser } = useVerify();

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<AuthFormType>({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSignUp = async () => {
    const { email, password } = getValues();
    const success = await signUpWithEmail(email, password);
    setPendingVerification(success || false);
  };

  const onVerification = async () => {
    const success = await verifyUser(code);
    if (success) {
      callToast({
        type: 'success',
        text1: 'Congratulations! 🎉',
        text2: 'Account verified successfully',
      });
      setIsNewUser(true);
    }
  };

  return {
    control,
    handleSubmit,
    getValues,
    errors,
    onSignUp,
    onVerification,
    signUpLoading,
    verificationLoading,
    pendingVerification,
    setCode,
    code,
  };
};

export default useSignUp;
