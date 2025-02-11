import { useAuth } from '@clerk/clerk-expo';
import { useEffect } from 'react';

import { supabaseClient } from '~/supabase/supabase.client';
import { Match } from '~/types/match.types';

const useMatchListener = (showMatchScreen: (match: Match) => void) => {
  const { getToken, userId } = useAuth();

  useEffect(() => {
    const initializeListener = async () => {
      try {
        // Retrieve the token only if necessary
        const token = await getToken({ template: 'supabase' });
        if (!token || !userId) return;

        const supabase = await supabaseClient(token);

        const subscription = supabase
          .channel('new-match-listener')
          .on(
            'postgres_changes',
            { event: 'INSERT', schema: 'public', table: 'matches' },
            (payload) => {
              console.log('Match data received:', payload);
              // Uncomment and modify this part when ready to handle the match
              // if (payload.new.user1_id === userId || payload.new.user2_id === userId) {
              //   showMatchScreen(payload.new);
              // }
            }
          )
          .subscribe();

        // Cleanup subscription on unmount
        return () => {
          supabase.removeChannel(subscription);
        };
      } catch (error) {
        console.error('Error initializing Supabase listener:', error);
      }
    };

    initializeListener();
  }, [getToken, userId]); // Only re-run when getToken or userId change
};

export default useMatchListener;
