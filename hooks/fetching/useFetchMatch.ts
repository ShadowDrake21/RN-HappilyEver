import { useAuth } from '@clerk/clerk-expo';
import { useCallback, useEffect, useState } from 'react';

import { DEFAULT_IMAGE } from '~/constants/variables';
import { useChatStore } from '~/store/chat.store';
import { getChatByMatchId } from '~/supabase/supabase-chatting';
import { fetchMatchingUsers } from '~/utils/fetch.utils';

type UserType = { user_id: string; image: string; isMine: boolean };

const useFetchMatch = (match_id: number) => {
  const { getToken, userId } = useAuth();

  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<{ firstUser: UserType; secondUser: UserType }>({
    firstUser: { user_id: '', image: DEFAULT_IMAGE, isMine: false },
    secondUser: { user_id: '', image: DEFAULT_IMAGE, isMine: false },
  });
  const { addChat, chats } = useChatStore();

  useEffect(() => {
    fetchMatchData();
  }, [match_id]);

  const fetchMatchData = useCallback(async () => {
    setLoading(true);
    try {
      const token = await getToken({ template: 'supabase' });
      if (!token || !userId) return;

      const [firstUser, secondUser] = await fetchMatchingUsers(token, match_id, userId);
      setUsers({ firstUser, secondUser });

      await addChatToStore(token, match_id, [firstUser.user_id, secondUser.user_id]);
    } catch (error) {
      console.error('Error retrieving match data', error);
    } finally {
      setLoading(false);
    }
  }, [match_id, userId]);

  const addChatToStore = async (token: string, match_id: number, user_ids: string[]) => {
    const chatId = await getChatByMatchId(token, match_id);
    const chat = {
      chatId: chatId.id,
      matchId: match_id,
      interlocutorId: user_ids[0] === userId ? user_ids[1] : user_ids[0],
    };

    addChat(chat);
  };

  const getChatId = () => {
    return chats.find((chat) => chat.matchId === match_id)?.chatId;
  };

  return { loading, users, fetchMatchData, getChatId };
};

export default useFetchMatch;
