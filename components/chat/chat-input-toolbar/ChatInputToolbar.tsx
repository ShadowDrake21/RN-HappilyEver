import React from 'react';
import { View } from 'react-native';
import { IMessage, InputToolbarProps } from 'react-native-gifted-chat';

import ChatInput from './ChatInput';
import ChatInputSend from './ChatInputSend';

import { MessageUserType } from '~/types/chat.types';
import { ChatStoreItem } from '~/types/store.types';

const ChatInputToolbar = ({
  props,
  messageUser,
  currentChat,
}: {
  props: InputToolbarProps<IMessage>;
  messageUser: MessageUserType;
  currentChat: ChatStoreItem | undefined;
}) => {
  return (
    <View className="w-full flex-row items-center justify-between gap-3 px-5 py-2">
      <ChatInput props={props} />
      <ChatInputSend currentChat={currentChat} messageUser={messageUser} />
    </View>
  );
};

export default ChatInputToolbar;
