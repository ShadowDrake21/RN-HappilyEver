import { useAuth } from '@clerk/clerk-expo';
import { useCallback, useEffect, useState } from 'react';

import useChatListener from '../listeners/useChatListener';

import { useChatContext } from '~/context/ChatContext';
import { getChatByMatchId, getLastMessage } from '~/supabase/supabase-chatting';
import { ChatUser, CompoundChat } from '~/types/chat.types';
import { flatUsers } from '~/utils/chat.utils';
import { fetchUserProfileImage } from '~/utils/fetch.utils';

const useFetchChats = () => {
  const { getToken, userId } = useAuth();
  const { allChats, loading: chatLoading } = useChatListener();
  const [compoundChats, setCompoundChats] = useState<CompoundChat[]>([]);
  const [photoLoading, setPhotoLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { state } = useChatContext();

  useEffect(() => {
    console.log('useFetchChats state.messages:', state.messages);
  }, [state.messages]);

  useEffect(() => {
    if (!chatLoading && allChats.length > 0) {
      componentChatsData();
    }
  }, [allChats, chatLoading, userId]);

  const componentChatsData = useCallback(async () => {
    const updatedChats: CompoundChat[] = [];

    setPhotoLoading(true);
    const token = await getToken({ template: 'supabase' });
    if (!token) {
      setPhotoLoading(false);
      setError('Failed to get token');
      return;
    }

    try {
      await Promise.all(
        allChats.map(async (chat) => {
          const flattenedUsers = flatUsers(chat.users);

          // TODO: refactor
          const userWithProfile = await Promise.all(
            flattenedUsers.map(async (user: { user_id: string; fullName: string }) => {
              if (user.user_id === userId) return null;

              const profileUrl = await fetchUserProfileImage(token, user.user_id);
              return {
                user_id: user.user_id,
                fullName: user.fullName,
                profileUrl,
              };
            })
          );

          const chatId = (await getChatByMatchId(token, chat.match_id)).id;
          const lastInteraction = await getLastMessage(token, chatId);

          const compoundChat: CompoundChat = {
            ...chat,
            chat_id: chatId,
            last_interaction: lastInteraction,
            users: userWithProfile.filter(Boolean) as ChatUser[],
          };

          updatedChats.push(compoundChat);
        })
      );

      setCompoundChats(updatedChats);

      setPhotoLoading(false);
    } catch (error) {
      console.error('Error fetching chat data:', error);
      setError('Failed to fetch chat data');
      setPhotoLoading(false);
    }
  }, [allChats]);

  const loading = chatLoading || photoLoading;
  return { compoundChats, loading, error };
};

export default useFetchChats;
