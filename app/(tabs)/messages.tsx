import { useAuth } from '@clerk/clerk-expo';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { DEFAULT_IMAGE } from '~/constants/variables';
import useChatListener from '~/hooks/useChatListener';
import { getChatByMatchId } from '~/supabase/supabase-chatting';

type ChatUser = {
  user_id: string;
  fullName: string;
  profileUrl: string;
};
interface CompoundChart {
  id: number;
  created_at: string;
  match_id: number;
  chat_id: number;
  last_interaction: {
    user_id: string;
    message: string;
    created_at: string;
  } | null;
  users: ChatUser[];
}

const Page = () => {
  const { allChats, loading } = useChatListener();
  const { getToken, userId } = useAuth();
  const [compoundChats, setConpoundChats] = useState<CompoundChart[]>([]);

  useEffect(() => {
    if (!loading && allChats.length > 0) {
      componentChatsData();
    }
  }, [allChats, loading]);

  const componentChatsData = async () => {
    const updatedChats: CompoundChart[] = [];

    const token = await getToken({ template: 'supabase' });
    if (!token) return;

    try {
      await Promise.all(
        allChats.map(async (chat) => {
          const userWithProfileUrls = await Promise.all(
            chat.users.map(async (user: { user_id: string; fullName: string }) => {
              if (user.user_id === userId) return;
              console.log('user:', user);

              // const profileUrl = await fetchUserProfileImage(token, user.user_id);

              return {
                ...user,
                profileUrl: DEFAULT_IMAGE,
              };
            })
          );

          const chatId = (await getChatByMatchId(token, chat.match_id)).id;
          const lasInteraction = null;

          const compoundChat: CompoundChart = {
            ...chat,
            chat_id: chatId,
            last_interaction: lasInteraction,
            users: userWithProfileUrls.filter(Boolean) as ChatUser[],
          };

          updatedChats.push(compoundChat);
        })
      );

      setConpoundChats(updatedChats);
    } catch (error) {
      console.error('Error fetching chat data:', error);
    }
  };

  useEffect(() => {
    console.log('compoundChats:', compoundChats);
  }, [compoundChats]);

  return (
    <View>
      <View>
        <Text>{JSON.stringify(compoundChats)}</Text>
        {compoundChats.map((chat) => (
          <View key={chat.chat_id}>
            {chat.users.map((user) => (
              <Text key={user.user_id}>{user.fullName}</Text>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({});
