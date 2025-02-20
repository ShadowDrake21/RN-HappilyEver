import { formatRelative } from 'date-fns';
import { Link } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text as PaperText } from 'react-native-paper';

import { COLORS } from '~/constants/colors';
import { CompoundChat } from '~/types/chat.types';

const MessageChatItem = ({ chat }: { chat: CompoundChat }) => {
  return (
    <Link
      href={`/chat/${chat.chat_id}`}
      key={chat.chat_id}
      asChild
      onPress={() => console.log('chat:', chat)}>
      <TouchableOpacity className="flex flex-row items-center gap-4">
        <Image
          source={{ uri: chat.users[0].profileUrl }}
          className="h-[80px] w-[80px] rounded-full"
        />

        <View className="gap-3">
          {chat.users.map((user) => (
            <PaperText variant="labelLarge" style={{ color: COLORS.text }} key={user.user_id}>
              {user.fullName}
            </PaperText>
          ))}
          <PaperText
            variant="labelMedium"
            numberOfLines={1}
            lineBreakMode="middle"
            style={{ color: COLORS.grayish, fontWeight: '700' }}>
            {chat.last_interaction?.message || 'Be the first to send a message'}
          </PaperText>
          <PaperText variant="labelSmall" style={{ color: COLORS.grayish, fontWeight: '300' }}>
            {formatRelative('2025-02-17T20:28:52.820Z', new Date())}
          </PaperText>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default MessageChatItem;

const styles = StyleSheet.create({});
