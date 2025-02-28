import { useForm } from 'react-hook-form';

import useLogin from '../useLogin';

const useSignInForm = () => {
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const { isLoading, signInWithEmail } = useLogin();

  const onSignIn = async () => {
    const { email, password } = getValues();
    await signInWithEmail(email, password);
  };

  return {
    control,
    handleSubmit,
    errors,
    onSignIn,
    isLoading,
  };
};

export default useSignInForm;
