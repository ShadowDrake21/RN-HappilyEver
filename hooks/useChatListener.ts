import { useAuth } from '@clerk/clerk-expo';
import { SupabaseClient } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

import { getAllChats } from '~/supabase/supabase-chatting';
import { supabaseClient } from '~/supabase/supabase.client';

const useChatListener = () => {
  const { getToken, userId } = useAuth();
  const [allChats, setAllChats] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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

        console.log('useChatListener Initializing Supabase client...');
        supabase = await supabaseClient(token);

        const { data: initialCharts, error: fetchError } = await getAllChats(token, userId);

        if (fetchError) {
          throw fetchError;
        }

        setAllChats(initialCharts as any);
        setLoading(false);

        console.log('useChatListener Subscribing to Supabase Realtime...');

        subscription = supabase
          .channel('custom-all-channel')
          .on(
            'postgres_changes',
            { event: '*', schema: 'public', table: 'chats' },
            async (payload) => {
              console.log('🔥 Chat data received:', payload.new);
              const { data, error: fetchError } = await getAllChats(token, userId);

              if (fetchError) {
                throw fetchError;
              }

              setAllChats(data || []);
            }
          )
          .subscribe((status) => {
            console.log('Subscription status:', status);
          });
      } catch (error) {
        console.error('❌ Error initializing Supabase listener:', error);
        setLoading(false);
      }
    };

    initializeListener();

    return () => {
      if (subscription) {
        supabase.removeChannel(subscription);
      }
    };
  }, [userId]);

  return { allChats, loading };
};

export default useChatListener;
