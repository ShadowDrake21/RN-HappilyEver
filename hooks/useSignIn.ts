import { useState } from 'react';

import { supabase } from '~/utils/supabase';

const useSignIn = ({ email, password }: { email: string; password: string }) => {
  const [loading, setLoading] = useState(false);

  const signInWithEmail = async () => {
    setLoading(true);
    const { error, data } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw new Error(error.message);

    setLoading(false);
    return data;
  };

  return { loading, signInWithEmail };
};

export default useSignIn;
