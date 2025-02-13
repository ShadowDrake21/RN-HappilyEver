import { useAuth } from '@clerk/clerk-expo';
import { StyleSheet } from 'react-native';

import { setSwipe } from '~/supabase/supabase-matching.requests';

const useSwipeHandler = () => {
  const { userId, getToken } = useAuth();

  const onSwipe = async (swippedId: string, type: 'like' | 'not_interested') => {
    const token = await getToken({ template: 'supabase' });

    if (token && userId) {
      try {
        await setSwipe(token, userId, swippedId, type);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return { onSwipe };
};

export default useSwipeHandler;

const styles = StyleSheet.create({});
