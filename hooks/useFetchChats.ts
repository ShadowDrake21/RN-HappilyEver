import { useAuth } from '@clerk/clerk-expo';
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

import useChatListener from './useChatListener';

import { getChatByMatchId } from '~/supabase/supabase-chatting';
import { ChatUser, CompoundChat } from '~/types/chat.types';
import { flatUsers } from '~/utils/chat.utils';
import { fetchUserProfileImage } from '~/utils/fetch.utils';

const useFetchChats = () => {
  const { getToken, userId } = useAuth();
  const { allChats, loading } = useChatListener();
  const [compoundChats, setCompoundChats] = useState<CompoundChat[]>([]);

  useEffect(() => {
    if (!loading && allChats.length > 0) {
      componentChatsData();
    }
  }, [allChats, loading, userId]);

  const componentChatsData = async () => {
    const updatedChats: CompoundChat[] = [];

    const token = await getToken({ template: 'supabase' });
    if (!token) return;

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
          const lasInteraction = null;

          const compoundChat: CompoundChat = {
            ...chat,
            chat_id: chatId,
            last_interaction: lasInteraction,
            users: userWithProfile.filter(Boolean) as ChatUser[],
          };

          updatedChats.push(compoundChat);
        })
      );

      setCompoundChats(updatedChats);
    } catch (error) {
      console.error('Error fetching chat data:', error);
    }
  };

  return { compoundChats, loading };
};

export default useFetchChats;
