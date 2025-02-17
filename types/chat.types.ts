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

export type ChatUser = {
  user_id: string;
  fullName: string;
  profileUrl: string;
};
export interface CompoundChat {
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
