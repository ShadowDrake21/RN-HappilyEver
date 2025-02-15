import { useAuth } from '@clerk/clerk-expo';
import { SupabaseClient } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

import { getAllMessages } from '~/supabase/supabase-chatting';
import { supabaseClient } from '~/supabase/supabase.client';

const useMessageListener = () => {
  const { getToken, userId } = useAuth();
  const [allMessages, setAllMessages] = useState<any[]>([]);
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

        console.log('useMessageListener Initializing Supabase client...');
        supabase = await supabaseClient(token);

        const { data: initialMessages, error: fetchError } = await getAllMessages(token, userId);

        if (fetchError) {
          throw fetchError;
        }

        setAllMessages(initialMessages || []);
        setLoading(false);

        console.log('useMessageListener Subscribing to Supabase Realtime...');

        subscription = supabase
          .channel('custom-all-channel')
          .on(
            'postgres_changes',
            { event: '*', schema: 'public', table: 'chats' },
            async (payload) => {
              console.log('🔥 Chat data received:', payload.new);
              const { data, error: fetchError } = await getAllMessages(token, userId);

              if (fetchError) {
                throw fetchError;
              }

              setAllMessages(data || []);
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

  return { allMessages, loading };
};

export default useMessageListener;
