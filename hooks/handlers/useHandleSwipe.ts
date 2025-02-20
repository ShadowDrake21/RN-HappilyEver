import { useAuth } from '@clerk/clerk-expo';

import { setSwipe } from '~/supabase/supabase-matching.requests';

const useHandleSwipe = () => {
  const { userId, getToken } = useAuth();

  const onSwipe = async (swippedId: string, type: 'like' | 'not_interested') => {
    const token = await getToken({ template: 'supabase' });

    if (token && userId) {
      try {
        await setSwipe(token, userId, swippedId, type);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return { onSwipe };
};

export default useHandleSwipe;
