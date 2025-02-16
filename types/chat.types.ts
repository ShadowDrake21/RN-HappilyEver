import { ActionKind } from '~/enums/chat.enum';

export interface ChatStateAction {
  type: ActionKind;
  payload?: any;
}

export interface IChatState {
  messages: any[];
  step: number;
  loadEarlier?: boolean;
  isLoadingEarlier?: boolean;
  isTyping: boolean;
}
