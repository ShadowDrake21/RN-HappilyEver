import CustomLoader from '@components/ui/CustomLoader';
import { formatRelative } from 'date-fns';
import { Link } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { Text as PaperText } from 'react-native-paper';

import { COLORS } from '~/constants/colors';
import { useChatContext } from '~/context/ChatContext';
import useMessageListener from '~/hooks/listeners/useMessageListener';
import { CompoundChat } from '~/types/chat.types';

const MessageChatItem = ({ chat }: { chat: CompoundChat }) => {
  const { state } = useChatContext();
  const [loading, setLoading] = useState(false);
  useMessageListener(chat.chat_id);

  useEffect(() => {
    setLoading(true);
    if (state.messages.length > 0) {
      setLoading(false);
    }
  }, [state.messages]);

  if (loading) return <CustomLoader />;
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
            <>
              <PaperText variant="labelLarge" style={{ color: COLORS.text }} key={user.user_id}>
                {user.fullName}
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
                  {state.messages.length > 0 && state.messages[0].user
                    ? state.messages[0].user._id === user.user_id
                      ? user.fullName.split(' ')[0]
                      : 'You'
                    : 'System'}
                  :
                </PaperText>{' '}
                {state.messages[0]?.text || 'Be the first to send a message'}
              </PaperText>
              <PaperText variant="labelSmall" style={{ color: COLORS.grayish, fontWeight: '300' }}>
                {formatRelative(state.messages[0]?.createdAt || new Date(), new Date())}
              </PaperText>
            </>
          ))}
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default MessageChatItem;
