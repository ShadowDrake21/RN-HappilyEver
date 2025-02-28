import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleSheet } from 'react-native';

import { COLORS } from '~/constants/colors';
import useHandleSendMessage from '~/hooks/chat/useHandleSendMessage';
import { MessageUserType } from '~/types/chat.types';
import { ChatStoreItem } from '~/types/store.types';

type ChatInputSendProps = {
  messageUser: MessageUserType;
  currentChat: ChatStoreItem | undefined;
};
const ChatInputSend = ({ currentChat, messageUser }: ChatInputSendProps) => {
  const { handleSendingMessage } = useHandleSendMessage({ messageUser, currentChat });

  return (
    <Pressable
      style={[
        styles.shadow,
        {
          backgroundColor: COLORS.mainPurple,
        },
      ]}
      className="rounded-full p-4"
      onPress={() => {
        handleSendingMessage();
      }}>
      <Ionicons
        name="send"
        size={24}
        color={COLORS.text}
        style={{ transform: [{ rotate: '-90deg' }] }}
      />
    </Pressable>
  );
};

export default ChatInputSend;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2.84,

    elevation: 4,
  },
});
