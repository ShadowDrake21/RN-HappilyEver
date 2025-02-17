import NavBar from '@components/chat/NavBar';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useChatContext } from '~/context/ChatContext';
import useChatActions from '~/hooks/useChatActions';
import { useChatStore } from '~/store/chat.store';
import { ChatStoreItem } from '~/types/store.types';
import { renderCustomActions, renderSend, renderSystemMessage } from '~/utils/renderChatFunctions';

const user = {
  _id: 1,
  name: 'Developer',
};

const Page = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { state } = useChatContext();
  const { onSend, onLoadEarlier, onPressAvatar, onSendFromUser } = useChatActions(user);
  const { chats } = useChatStore();
  const [currentChat, setCurrentChat] = useState<ChatStoreItem | undefined>(undefined);

  useEffect(() => {
    setCurrentChat(chats.find((chat) => chat.chatId === +id));
  }, [id]);

  return (
    <SafeAreaView style={[styles.fill, styles.container]}>
      <NavBar id={currentChat?.interlocutorId} />
      <View style={[styles.fill, styles.content]}>
        {/* <Text>
          {currentChat?.chatId} {currentChat?.interlocutorId}
        </Text> */}
        <GiftedChat
          user={user}
          messages={state.messages}
          onSend={onSend}
          loadEarlier={state.loadEarlier}
          onLoadEarlier={onLoadEarlier}
          isLoadingEarlier={state.isLoadingEarlier}
          scrollToBottom
          onPressAvatar={onPressAvatar}
          renderActions={(props) => renderCustomActions(props, onSendFromUser)}
          renderSystemMessage={renderSystemMessage}
          renderSend={renderSend}
          keyboardShouldPersistTaps="never"
          timeTextStyle={{
            left: { color: 'red' },
            right: { color: 'yellow' },
          }}
          isTyping={state.isTyping}
          inverted={Platform.OS !== 'web'}
          infiniteScroll
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
  container: {
    backgroundColor: '#f5f5f5',
    flex: 1,
  },
  content: {
    backgroundColor: '#ffffff',
  },
});

export default Page;
