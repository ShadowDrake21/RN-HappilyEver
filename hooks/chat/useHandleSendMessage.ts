import { useAuth } from '@clerk/clerk-expo';
import { useCallback } from 'react';

import useChatActions from './useChatActions';

import { useChatContext } from '~/context/ChatContext';
import { ActionKind } from '~/enums/chat.enum';
import { sendMessage } from '~/supabase/supabase-chatting';
import { MessageUserType } from '~/types/chat.types';
import { ChatStoreItem } from '~/types/store.types';

const useHandleSendMessage = ({
  messageUser,
  currentChat,
}: {
  messageUser: MessageUserType;
  currentChat: ChatStoreItem | undefined;
}) => {
  const { getToken, userId } = useAuth();
  const { state, dispatch } = useChatContext();
  const { onSend } = useChatActions();

  const handleSendingMessage = useCallback(async () => {
    if (!state.currentMessage) return;
    const token = await getToken({ template: 'supabase' });

    if (!token || !currentChat || !userId) return;
    onSend([
      {
        _id: Math.round(Math.random() * 1000000),
        text: state.currentMessage,
        createdAt: new Date(),
        user: messageUser,
      },
    ]);
    await sendMessage(token, currentChat.chatId, userId, state.currentMessage);

    dispatch({ type: ActionKind.SET_CURRENT_MESSAGE, payload: '' });
  }, [state.currentMessage, currentChat]);

  return { handleSendingMessage };
};

export default useHandleSendMessage;
