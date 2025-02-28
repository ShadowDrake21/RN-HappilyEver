import { Link } from 'expo-router';
import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { IMessage } from 'react-native-gifted-chat';
import { Text as PaperText } from 'react-native-paper';

import { COLORS } from '~/constants/colors';
import { CompoundChat } from '~/types/chat.types';
import { getLastMessageText, getLastMessageTime, getLastSenderName } from '~/utils/chat.utils';

const MessageChatItemLink = ({ chat, messages }: { chat: CompoundChat; messages: IMessage[] }) => {
  return (
    <Link href={`/chat/${chat.chat_id}`} key={chat.chat_id} asChild>
      <TouchableOpacity className="flex flex-row items-center gap-4">
        <Image source={{ uri: chat.user.profileUrl }} className="h-[80px] w-[80px] rounded-full" />
        <View className="gap-3">
          <PaperText variant="labelLarge" style={{ color: COLORS.text }} key={chat.user.user_id}>
            {chat.user.fullName}
          </PaperText>
          <PaperText
            variant="labelMedium"
            numberOfLines={1}
            lineBreakMode="middle"
            style={{ color: COLORS.grayish, fontWeight: '700' }}>
            <PaperText
              variant="labelMedium"
              numberOfLines={1}
              lineBreakMode="middle"
              style={{ color: COLORS.grayish, fontWeight: 800 }}>
              {getLastSenderName(messages, chat)}:
            </PaperText>{' '}
            {getLastMessageText(messages[0])}
          </PaperText>
          <PaperText variant="labelSmall" style={{ color: COLORS.grayish, fontWeight: '300' }}>
            {getLastMessageTime(messages[0])}
          </PaperText>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default MessageChatItemLink;
