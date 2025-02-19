import { useAuth, useUser } from '@clerk/clerk-expo';
import { SupabaseClient } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import { IMessage } from 'react-native-gifted-chat';

import useChatActions from './useChatActions';

import { getAllMessages } from '~/supabase/supabase-chatting';
import { supabaseClient } from '~/supabase/supabase.client';
import { formatMessages } from '~/utils/format.utils';

const useMessageListener = (chatId: number) => {
  const { user } = useUser();
  const { getToken, userId } = useAuth();
  const [allMessages, setAllMessages] = useState<IMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const { onSetMessages, onLoadEarlier, onPressAvatar, onSendFromUser } = useChatActions();

  useEffect(() => {
    let subscription: any;
    let supabase: SupabaseClient<any, 'public', any>;

    const initializeListener = async () => {
      console.log('useMessageListener Initializing...', userId, chatId);
      try {
        const token = await getToken({ template: 'supabase' });
        if (!token || !userId) {
          console.log('No token or userId, skipping subscription.');
          return;
        }

        console.log('useMessageListener Initializing Supabase client...');
        supabase = await supabaseClient(token);

        const { data: initialMessages, error: fetchError } = await getAllMessages(token, chatId);

        if (fetchError) {
          throw fetchError;
        }

        onSetMessages(formatMessages(initialMessages));
        setLoading(false);

        console.log('useMessageListener Subscribing to Supabase Realtime...');

        subscription = supabase
          .channel('custom-messages-channel')
          .on(
            'postgres_changes',
            { event: '*', schema: 'public', table: 'messages', filter: `chat_id=eq.${chatId}` },
            async (payload) => {
              console.log('🔥 Chat data received:', payload.new);
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

  return { allMessages, loading };
};

export default useMessageListener;
