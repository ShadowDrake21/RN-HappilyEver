import { useAuth } from '@clerk/clerk-expo';
import { SupabaseClient } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

import useChatActions from '../chat/useChatActions';

import { getAllMessages } from '~/supabase/supabase-chatting';
import { supabaseClient } from '~/supabase/supabase.client';
import { formatMessages } from '~/utils/format.utils';

const useMessageListener = (chatId: number) => {
  const { getToken, userId } = useAuth();

  const [loading, setLoading] = useState(true);
  const { onSetMessages } = useChatActions();

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
        supabase = await supabaseClient(token);

        const { data: initialMessages, error: fetchError } = await getAllMessages(token, chatId);

        if (fetchError) {
          throw fetchError;
        }

        onSetMessages(formatMessages(initialMessages));
        setLoading(false);

        subscription = supabase
          .channel('custom-messages-channel')
          .on(
            'postgres_changes',
            { event: '*', schema: 'public', table: 'messages', filter: `chat_id=eq.${chatId}` },
            async (payload) => {
              const { data, error: fetchError } = await getAllMessages(token, chatId);

              if (fetchError) {
                throw fetchError;
              }

              onSetMessages(formatMessages(data || []));
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
  }, [userId, chatId]);

  return { loading };
};

export default useMessageListener;
