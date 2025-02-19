import { createContext, PropsWithChildren, useContext, useReducer, useState } from 'react';

import { chatReducer, initialChatState } from '~/reducers/chat.reducer';
import { ChatStateAction, IChatState } from '~/types/chat.types';
import { ChatStoreItem } from '~/types/store.types';

type ChatContextType = {
  state: IChatState;
  dispatch: React.Dispatch<ChatStateAction>;
  emojiOpen: boolean;
  setEmojiOpen: React.Dispatch<React.SetStateAction<boolean>>;
  currentChat: ChatStoreItem | undefined;
  setCurrentChat: React.Dispatch<React.SetStateAction<ChatStoreItem | undefined>>;
};

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(chatReducer, initialChatState);
  const [emojiOpen, setEmojiOpen] = useState<boolean>(false);
  const [currentChat, setCurrentChat] = useState<ChatStoreItem | undefined>(undefined);

  return (
    <ChatContext.Provider
      value={{ state, dispatch, emojiOpen, setEmojiOpen, currentChat, setCurrentChat }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => {
  const context = useContext(ChatContext);

  if (!context) {
    throw new Error('useChatContext must be within a ChatProvider');
  }

  return context;
};
