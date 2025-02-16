import messagesData from '~/content/messages';
import { ActionKind } from '~/enums/chat.enum';
import { ChatStateAction, IChatState } from '~/types/chat.types';

export const initialChatState = {
  messages: messagesData,
  step: 0,
  loadEarlier: true,
  isLoadingEarlier: false,
  isTyping: false,
};

export function chatReducer(state: IChatState, action: ChatStateAction) {
  switch (action.type) {
    case ActionKind.SEND_MESSAGE: {
      return {
        ...state,
        step: state.step + 1,
        messages: action.payload,
      };
    }
    case ActionKind.LOAD_EARLIER_MESSAGES: {
      return {
        ...state,
        loadEarlier: true,
        isLoadingEarlier: false,
        messages: action.payload,
      };
    }
    case ActionKind.LOAD_EARLIER_START: {
      return {
        ...state,
        isLoadingEarlier: true,
      };
    }
    case ActionKind.SET_IS_TYPING: {
      return {
        ...state,
        isTyping: action.payload,
      };
    }
  }
}
