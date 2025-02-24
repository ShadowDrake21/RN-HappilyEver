import CustomLoader from '@components/ui/CustomLoader';
import React, { useEffect, useState } from 'react';

import MessageChatItemLink from './MessageChatItemLink';

import { useChatContext } from '~/context/ChatContext';
import useMessageListener from '~/hooks/listeners/useMessageListener';
import { CompoundChat } from '~/types/chat.types';

const MessageChatItem = ({ chat }: { chat: CompoundChat }) => {
  const { state } = useChatContext();
  const [loading, setLoading] = useState(false);
  useMessageListener(chat.chat_id);

  useEffect(() => {
    setLoading(true);
    if (state.messages.length > 0) {
      setLoading(false);
    }
  }, [state.messages]);

  if (loading) return <CustomLoader />;
  return <MessageChatItemLink chat={chat} messages={state.messages} />;
};

export default MessageChatItem;
