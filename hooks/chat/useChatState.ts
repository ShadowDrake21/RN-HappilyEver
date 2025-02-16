import { useReducer } from 'react';

import { ActionKind } from '~/enums/chat.enum';
import { chatReducer, initialChatState } from '~/reducers/chat.reducer';

const useChatState = () => {
  const [state, dispatch] = useReducer(chatReducer, initialChatState);

  const setIsTyping = (isTyping: boolean) => {
    dispatch({ type: ActionKind.SET_IS_TYPING, payload: isTyping });
  };

  return { state, dispatch, setIsTyping };
};

export default useChatState;
