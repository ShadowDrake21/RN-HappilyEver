import { IMessage } from 'react-native-gifted-chat';

import { ChatStoreItem } from './store.types';

import { ActionKind } from '~/enums/chat.enum';

export interface ChatStateAction {
  type: ActionKind;
  payload?: any;
}

export type FormattedMessage = {
  _id: number;
  text: string;
  createdAt: Date;
  user?: {
    _id: string;
    name: string;
  };
  system?: boolean;
};

export interface IChatState {
  messages: IMessage[];
  step: number;
  loadEarlier?: boolean;
  isLoadingEarlier?: boolean;
  isTyping: boolean;
  currentChat: ChatStoreItem | undefined;
  currentMessage: string;
  emojiOpen: boolean;
}

export type ChatUser = {
  user_id: string;
  fullName: string;
  profileUrl: string;
};

export type CompoundChatLastInteraction = {
  user_id: string;
  message: string;
  created_at: string;
} | null;

export interface CompoundChat {
  id: number;
  created_at: string;
  match_id: number;
  chat_id: number;
  last_interaction: CompoundChatLastInteraction | null;
  users: ChatUser[];
}

export type InterlocutorType = {
  birthDate: string;
  created_at: string;
  email: string;
  fullName: string;
  gender: string;
  id: string;
  isFilledOut: boolean;
  occupation: string;
  phoneNumber: string;
  updated_at: string;
  user_id: string;
  username: string;
  image: string;
};

export type RawMessage = {
  author_id: string;
  chat_id: number;
  content: string;
  created_at: string;
  id: number;
  user: { fullName: string; user_id: string };
};

export type MessageUserType = { _id: string; name: string; avatar: string };
