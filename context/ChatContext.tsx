import { createContext, PropsWithChildren, useContext, useReducer } from 'react';

import { chatReducer, initialChatState } from '~/reducers/chat.reducer';
import { ChatStateAction, IChatState } from '~/types/chat.types';

type ChatContextType = {
  state: IChatState;
  dispatch: React.Dispatch<ChatStateAction>;
};

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(chatReducer, initialChatState);

  return (
    <ChatContext.Provider
      value={{
        state,
        dispatch,
      }}>
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
