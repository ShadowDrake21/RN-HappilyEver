import { useAuth } from '@clerk/clerk-expo';
import { SupabaseClient } from '@supabase/supabase-js';
import { useEffect } from 'react';

import { supabaseClient } from '~/supabase/supabase.client';
import { Match } from '~/types/match.types';

const useMatchListener = (showMatchScreen: (match: Match) => void) => {
  const { getToken, userId } = useAuth();

  useEffect(() => {
    let subscription: any;
    let supabase: SupabaseClient<any, 'public', any>;

    const initializeListener = async () => {
      try {
        const token = await getToken({ template: 'supabase' });
        if (!token || !userId) {
          console.log('No token or userId, skipping subscription.');
          return;
        }

        console.log('Initializing Supabase client...');
        supabase = await supabaseClient(token);

        console.log('Subscribing to Supabase Realtime...');
        subscription = supabase
          .channel('new-match-listener')
          .on('postgres_changes', { event: '*', schema: 'public', table: 'matches' }, (payload) => {
            console.log('🔥 Match data received:', payload.new);
            const matchData = payload.new as Match;
            // Uncomment when ready
            if (matchData.user1_id === userId || matchData.user2_id === userId) {
              showMatchScreen(matchData);
            }
          })
          .subscribe((status) => {
            console.log('Subscription status:', status);
          });
      } catch (error) {
        console.error('❌ Error initializing Supabase listener:', error);
      }
    };

    initializeListener();

    return () => {
      if (subscription) {
        supabase.removeChannel(subscription);
      }
    };
  }, [userId, getToken]); // Include getToken to re-run if token changes
};

export default useMatchListener;
