import { useEffect, useState } from 'react';

import { supabase } from '~/utils/supabase';

const useSignIn = () => {
  const [loading, setLoading] = useState(false);

  const signInWithEmail = async (email: string, password: string) => {
    setLoading(true);
    const { error, data } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    console.log('useSignIn -> data | error', data, error);
    if (error) throw new Error(error.message);
    setLoading(false);
    return data;
  };

  return { loading, signInWithEmail };
};

export default useSignIn;
