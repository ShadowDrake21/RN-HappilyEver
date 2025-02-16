import NavBar from '@components/chat/NavBar';
import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { SafeAreaView } from 'react-native-safe-area-context';

import useChatActions from '~/hooks/chat/useChatActions';
import useChatState from '~/hooks/chat/useChatState';
import {
  renderCustomActions,
  renderCustomView,
  renderSend,
  renderSystemMessage,
} from '~/utils/renderChatFunctions';

const user = {
  _id: 1,
  name: 'Developer',
};

// const otherUser = {
//   _id: 2,
//   name: 'React Native',
//   avatar: 'https://facebook.github.io/react/img/logo_og.png',
// }

const Page = () => {
  const { state } = useChatState();
  const {
    onSend,
    onLoadEarlier,
    handleLongPress,
    onLongPressAvatar,
    onPressAvatar,
    onSendFromUser,
  } = useChatActions(user);

  return (
    <SafeAreaView style={[styles.fill, styles.container]}>
      <NavBar />
      <View style={[styles.fill, styles.content]}>
        <GiftedChat
          messages={state.messages}
          onSend={onSend}
          loadEarlier={state.loadEarlier}
          onLoadEarlier={onLoadEarlier}
          isLoadingEarlier={state.isLoadingEarlier}
          user={user}
          scrollToBottom
          onPressAvatar={onPressAvatar}
          onLongPressAvatar={onLongPressAvatar}
          onLongPress={handleLongPress}
          quickReplyStyle={{ borderRadius: 2 }}
          quickReplyTextStyle={{
            fontWeight: '200',
          }}
          renderActions={(props) => renderCustomActions(props, onSendFromUser)}
          renderSystemMessage={renderSystemMessage}
          renderCustomView={renderCustomView}
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
