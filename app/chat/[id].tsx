import { useUser } from '@clerk/clerk-expo';
import ChatBubble from '@components/chat/ChatBubble';
import ChatHeaderActions from '@components/chat/ChatHeaderActions';
import ChatInputToolbar from '@components/chat/ChatInputToolbar';
import HeaderLeftButton from '@components/main-settings/HeaderActionButton';
import CustomLoader from '@components/ui/CustomLoader';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { Image, Platform, StyleSheet, Text, View } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import EmojiPicker, { type EmojiType } from 'rn-emoji-keyboard';

import { COLORS } from '~/constants/colors';
import { DEFAULT_IMAGE } from '~/constants/variables';
import { useChatContext } from '~/context/ChatContext';
import useChatActions from '~/hooks/useChatActions';
import useChatInterlocutor from '~/hooks/useChatInterlocutor';
import { useChatStore } from '~/store/chat.store';
import { ChatStoreItem } from '~/types/store.types';
import { formChatUser } from '~/utils/format.utils';
import { renderCustomActions, renderSystemMessage } from '~/utils/renderChatFunctions';

const Page = () => {
  const { user } = useUser();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { bottom } = useSafeAreaInsets();
  const [chatLoading, setChatLoading] = useState(false);
  const { state } = useChatContext();
  const { onPressAvatar, onSendFromUser } = useChatActions();
  const { chats } = useChatStore();
  const [currentChat, setCurrentChat] = useState<ChatStoreItem | undefined>(undefined);
  const [message, setMessage] = useState('');
  const {
    fetchInterlocutorImage,
    getInterlocutor,
    interlocutor,
    setInterlocutor,
    isLoadingInterlocutor,
    setIsLoadingInterlocutor,
  } = useChatInterlocutor();

  useEffect(() => {
    fetchData();
  }, [id, chats]);

  const fetchData = async () => {
    setChatLoading(true);
    const foundChat = chats.find((chat) => chat.chatId === +id);
    setCurrentChat(foundChat);

    if (foundChat) {
      const fetchedInterlocutor = await getInterlocutor(foundChat.interlocutorId);
      setInterlocutor(fetchedInterlocutor);
      const image = await fetchInterlocutorImage(foundChat.interlocutorId);
      setInterlocutor((prev) => (prev ? { ...prev, image: image! } : prev));
    }

    setChatLoading(false);
    setIsLoadingInterlocutor(false);
  };

  const handlePick = useCallback((emojiObject: EmojiType) => {
    setMessage((prev) => prev + emojiObject.emoji);
  }, []);

  const renderAvatar = useCallback(
    () => (
      <Image
        source={{ uri: interlocutor?.image || DEFAULT_IMAGE }}
        style={{ width: 40, height: 40, borderRadius: 20 }}
      />
    ),
    [interlocutor?.image]
  );

  const renderHeader = useCallback(
    (tintColor: string | undefined) => (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start' }}>
        <Text className="font-poppins-semibold text-lg" style={{ color: tintColor }}>
          {interlocutor?.fullName || 'Unknown user'}
        </Text>
      </View>
    ),
    [interlocutor?.fullName]
  );

  if (isLoadingInterlocutor || chatLoading) return <CustomLoader />;

  return (
    <>
      <Stack.Screen
        options={{
          headerTintColor: COLORS.text,
          headerBackVisible: true,
          headerShadowVisible: false,
          headerTitle: ({ tintColor }) => renderHeader(tintColor),
          headerLeft: ({ tintColor }) => (
            <HeaderLeftButton
              tintColor={tintColor}
              onPress={() => {
                router.back();
              }}
            />
          ),
          headerRight: () => <ChatHeaderActions />,
        }}
      />
      <View style={[styles.fill, styles.container, { paddingBottom: bottom }]}>
        <GiftedChat
          user={formChatUser({ id: user?.id, fullName: user?.fullName, imageUrl: user?.imageUrl })}
          messages={state.messages}
          scrollToBottom
          onPressAvatar={onPressAvatar}
          scrollToBottomComponent={() => (
            <View>
              <AntDesign name="downcircle" size={32} color={COLORS.gray} />
            </View>
          )}
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
              setIsOpen={setIsOpen}
            />
          )}
          infiniteScroll
        />
        <EmojiPicker onEmojiSelected={handlePick} open={isOpen} onClose={() => setIsOpen(false)} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
  container: {
    backgroundColor: COLORS.extraDark,
    flex: 1,
  },
  content: {
    backgroundColor: '#ffffff',
  },
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

export default Page;
