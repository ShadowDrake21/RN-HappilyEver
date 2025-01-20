import { useState } from 'react';
import { Alert } from 'react-native';

import { supabase } from '~/utils/supabase';

const useSignUp = ({ email, password }: { email: string; password: string }) => {
  const [loading, setLoading] = useState(false);

  const signUpWithEmail = async () => {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) throw new Error(error.message);
    if (!session) Alert.alert('Please check your inbox for email verification!');
    setLoading(false);

    return session;
  };

  return { loading, signUpWithEmail };
};

export default useSignUp;
