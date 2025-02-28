import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';

import useChatInterlocutor from './useChatInterlocutor';

import { useChatContext } from '~/context/ChatContext';
import { ActionKind } from '~/enums/chat.enum';
import { useChatStore } from '~/store/chat.store';

const useFetchChatData = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { chats } = useChatStore();
  const { dispatch } = useChatContext();
  const {
    fetchInterlocutorImage,
    getInterlocutor,
    setInterlocutor,
    interlocutor,
    setIsLoadingInterlocutor,
    isLoadingInterlocutor,
  } = useChatInterlocutor();

  const [chatLoading, setChatLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, [id, chats]);

  const fetchData = async () => {
    setChatLoading(true);
    const foundChat = chats.find((chat) => chat.chatId === +id);
    dispatch({ type: ActionKind.SET_CURRENT_CHAT, payload: foundChat });

    if (foundChat) {
      const fetchedInterlocutor = await getInterlocutor(foundChat.interlocutorId);
      setInterlocutor(fetchedInterlocutor);
      const image = await fetchInterlocutorImage(foundChat.interlocutorId);
      setInterlocutor((prev) => (prev ? { ...prev, image: image! } : prev));
    }

    setChatLoading(false);
    setIsLoadingInterlocutor(false);
  };

  return { chatLoading, interlocutor, isLoadingInterlocutor };
};

export default useFetchChatData;
