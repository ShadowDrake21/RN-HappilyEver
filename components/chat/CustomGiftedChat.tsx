import { useUser } from '@clerk/clerk-expo';
import { AntDesign } from '@expo/vector-icons';
import React, { useCallback, useState } from 'react';
import { Platform, StyleSheet, Text, View, Image } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';

import ChatBubble from './ChatBubble';
import ChatInputToolbar from './ChatInputToolbar';

import { COLORS } from '~/constants/colors';
import { DEFAULT_IMAGE } from '~/constants/variables';
import { useChatContext } from '~/context/ChatContext';
import useChatActions from '~/hooks/useChatActions';
import { InterlocutorType } from '~/types/chat.types';
import { ChatStoreItem } from '~/types/store.types';
import { formChatUser } from '~/utils/format.utils';
import { renderCustomActions, renderSystemMessage } from '~/utils/renderChatFunctions';

const CustomGiftedChat = ({ interlocutor }: { interlocutor: InterlocutorType | undefined }) => {
  const { user } = useUser();
  const { state, setEmojiOpen, currentChat } = useChatContext();
  const { onPressAvatar, onSendFromUser } = useChatActions();

  const renderScrollToBottom = useCallback(
    () => (
      <View>
        <AntDesign name="downcircle" size={32} color={COLORS.gray} />
      </View>
    ),
    []
  );

  const renderAvatar = useCallback(
    () => (
      <Image
        source={{ uri: interlocutor?.image || DEFAULT_IMAGE }}
        style={{ width: 40, height: 40, borderRadius: 20 }}
      />
    ),
    [interlocutor?.image]
  );

  return (
    <GiftedChat
      user={formChatUser({ id: user?.id, fullName: user?.fullName, imageUrl: user?.imageUrl })}
      messages={state.messages}
      scrollToBottom
      onPressAvatar={onPressAvatar}
      scrollToBottomComponent={renderScrollToBottom}
      scrollToBottomStyle={{ width: 32, height: 32, backgroundColor: 'transparent' }}
      renderActions={(props) => renderCustomActions(props, onSendFromUser)}
      renderSystemMessage={renderSystemMessage}
      renderAvatar={renderAvatar}
      renderBubble={(props) => <ChatBubble {...props} />}
      keyboardShouldPersistTaps="never"
      timeTextStyle={{
        left: { color: COLORS.grayish },
        right: { color: COLORS.light },
      }}
      listViewProps={{ showsVerticalScrollIndicator: false }}
      isTyping={state.isTyping}
      inverted={Platform.OS !== 'web'}
      renderInputToolbar={(props) => (
        <ChatInputToolbar
          currentChat={currentChat}
          messageUser={formChatUser({
            id: user?.id,
            fullName: user?.fullName,
            imageUrl: user?.imageUrl,
          })}
          props={props}
          setIsOpen={setEmojiOpen}
        />
      )}
      infiniteScroll
    />
  );
};

export default CustomGiftedChat;

const styles = StyleSheet.create({});
