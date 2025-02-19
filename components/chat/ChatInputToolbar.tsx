import { useAuth } from '@clerk/clerk-expo';
import { Entypo, Feather, Ionicons } from '@expo/vector-icons';
import React, { useCallback, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { IMessage, InputToolbarProps } from 'react-native-gifted-chat';
import { TextInput, useTheme } from 'react-native-paper';

import { COLORS } from '~/constants/colors';
import useChatActions from '~/hooks/useChatActions';
import { sendMessage } from '~/supabase/supabase-chatting';
import { MessageUserType } from '~/types/chat.types';
import { ChatStoreItem } from '~/types/store.types';

const ChatInputToolbar = ({
  props,
  messageUser,
  currentChat,
  setIsOpen,
}: {
  props: InputToolbarProps<IMessage>;
  messageUser: MessageUserType;
  currentChat: ChatStoreItem | undefined;
  setIsOpen: (value: React.SetStateAction<boolean>) => void;
}) => {
  const { getToken, userId } = useAuth();
  const [message, setMessage] = useState('');
  const { onSend } = useChatActions();
  const theme = useTheme();
  const { colors } = theme;

  const handleSendingMessage = useCallback(async () => {
    if (!message) return;
    const token = await getToken({ template: 'supabase' });

    if (!token || !currentChat || !userId) return;
    onSend([
      {
        _id: Math.round(Math.random() * 1000000),
        text: message,
        createdAt: new Date(),
        user: messageUser,
      },
    ]);
    await sendMessage(token, currentChat.chatId, userId, message);

    setMessage('');
  }, [message, currentChat]);

  return (
    <View className="w-full flex-row items-center justify-between gap-3 px-5 py-2">
      <View
        style={[{ backgroundColor: COLORS.dark }, styles.shadow]}
        className="flex-1 flex-row items-center rounded-full px-3">
        <Pressable onPress={() => setIsOpen(true)}>
          <Entypo name="emoji-flirt" size={20} color={COLORS.grayish} />
        </Pressable>
        <TextInput
          underlineColor="transparent"
          theme={{ ...theme, colors: { ...colors, primary: 'transparent' } }}
          onChangeText={setMessage}
          value={message}
          placeholder="Type your message..."
          placeholderTextColor={COLORS.grayish}
          textColor={COLORS.text}
          style={{ backgroundColor: COLORS.dark, flex: 1, fontSize: 14 }}
          autoCorrect={false}
          autoCapitalize="sentences"
          {...props}
        />
        <View className="flex-row gap-3">
          <Pressable>
            <Feather name="paperclip" size={20} color={COLORS.grayish} />
          </Pressable>
          <Pressable>
            <Ionicons name="camera-outline" size={20} color={COLORS.grayish} />
          </Pressable>
        </View>
      </View>
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
    </View>
  );
};

export default ChatInputToolbar;

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
