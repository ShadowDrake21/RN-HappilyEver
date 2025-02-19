import { useAuth, useUser } from '@clerk/clerk-expo';
import HeaderLeftButton from '@components/main-settings/HeaderActionButton';
import CustomLoader from '@components/ui/CustomLoader';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { Image, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { Bubble, GiftedChat } from 'react-native-gifted-chat';
import { TextInput, useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import EmojiPicker, { type EmojiType } from 'rn-emoji-keyboard';

import { COLORS } from '~/constants/colors';
import { DEFAULT_IMAGE } from '~/constants/variables';
import { useChatContext } from '~/context/ChatContext';
import useChatActions from '~/hooks/useChatActions';
import useMessageListener from '~/hooks/useMessageListener';
import { useChatStore } from '~/store/chat.store';
import { sendMessage } from '~/supabase/supabase-chatting';
import { getProfileById } from '~/supabase/supabase-typed.requests';
import { InterlocutorType } from '~/types/chat.types';
import { ChatStoreItem } from '~/types/store.types';
import { fetchUserProfileImage } from '~/utils/fetch.utils';
import { renderCustomActions, renderSystemMessage } from '~/utils/renderChatFunctions';

const Page = () => {
  const { user } = useUser();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { bottom } = useSafeAreaInsets();
  const [chatLoading, setChatLoading] = useState(false);
  const { getToken, userId } = useAuth();
  const { state } = useChatContext();
  const { onSetMessages, onSend, onLoadEarlier, onPressAvatar, onSendFromUser } =
    useChatActions(user);
  const { chats } = useChatStore();
  const [currentChat, setCurrentChat] = useState<ChatStoreItem | undefined>(undefined);
  const [interlocutor, setInterlocutor] = useState<InterlocutorType | undefined>(undefined);
  const [message, setMessage] = useState('');
  const theme = useTheme();
  const { colors } = theme;

  const { allMessages, loading } = useMessageListener(+id);

  useEffect(() => {
    setChatLoading(true);
    setCurrentChat(chats.find((chat) => chat.chatId === +id));
    onSetMessages(allMessages);
    getInterlocutor();
    fetchInterlocutorImage();
    setChatLoading(false);
  }, [id, allMessages]);

  const fetchInterlocutorImage = async () => {
    const token = await getToken({ template: 'supabase' });

    if (!token || !currentChat) return;
    try {
      const profileUrl = await fetchUserProfileImage(token, currentChat.interlocutorId);
      console.log('profileUrl', profileUrl.slice(0, 50));

      setInterlocutor((prev) => (prev ? { ...prev, image: profileUrl } : undefined));
    } catch (error) {
      console.error('error', error);
    }
  };

  const getInterlocutor = async () => {
    const token = await getToken({ template: 'supabase' });

    if (!token || !currentChat) return;

    const interlocutor = (await getProfileById(
      token,
      currentChat?.interlocutorId
    )) as unknown as InterlocutorType;
    setInterlocutor(interlocutor);
  };

  const handlePick = useCallback((emojiObject: EmojiType) => {
    setMessage((prev) => prev + emojiObject.emoji);
  }, []);

  const formChatUser = () => {
    return {
      _id: user?.id || Math.round(Math.random() * 1000000),
      name: user?.fullName || 'Unknown user',
      avatar: user?.imageUrl || DEFAULT_IMAGE,
    };
  };

  const handleSendingMessage = useCallback(async () => {
    if (!message) return;
    const token = await getToken({ template: 'supabase' });

    if (!token || !currentChat || !userId) return;
    onSend([
      {
        _id: Math.round(Math.random() * 1000000),
        text: message,
        createdAt: new Date(),
        user: formChatUser(),
      },
    ]);
    await sendMessage(token, currentChat.chatId, userId, message);

    setMessage('');
  }, [message, currentChat]);

  if (chatLoading) return <CustomLoader />;

  return (
    <>
      <Stack.Screen
        options={{
          headerTintColor: COLORS.text,
          headerBackVisible: true,
          headerShadowVisible: false,
          headerTitle: ({ tintColor }) => (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start' }}>
              <Text className="font-poppins-semibold text-lg" style={{ color: tintColor }}>
                {interlocutor?.fullName || 'Unknown user'}
              </Text>
            </View>
          ),
          headerLeft: ({ tintColor }) => (
            <HeaderLeftButton
              tintColor={tintColor}
              onPress={() => {
                router.back();
              }}
            />
          ),
          headerRight: () => (
            <View className="flex-row gap-5">
              <Pressable>
                <Ionicons name="call-outline" size={24} color={COLORS.grayish} />
              </Pressable>
              <Pressable>
                <Ionicons name="videocam-outline" size={24} color={COLORS.grayish} />
              </Pressable>
              <Pressable>
                <Ionicons name="settings-outline" size={24} color={COLORS.grayish} />
              </Pressable>
            </View>
          ),
        }}
      />
      <View style={[styles.fill, styles.container, { paddingBottom: bottom }]}>
        <GiftedChat
          user={formChatUser()}
          messages={state.messages}
          loadEarlier={state.loadEarlier}
          onLoadEarlier={onLoadEarlier}
          isLoadingEarlier={state.isLoadingEarlier}
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
          renderAvatar={() => (
            <Image
              source={{ uri: interlocutor?.image! }}
              style={{ width: 40, height: 40, borderRadius: 20 }}
            />
          )}
          renderBubble={(props) => (
            <Bubble
              {...props}
              wrapperStyle={{
                left: {
                  backgroundColor: COLORS.lightDark,
                  borderRadius: 10,
                  padding: 8,
                },
                right: {
                  backgroundColor: COLORS.messagePurple,
                  borderRadius: 10,
                  padding: 8,
                },
              }}
              textStyle={{
                left: {
                  color: '#fff',
                },
                right: {
                  color: '#fff',
                },
              }}
            />
          )}
          keyboardShouldPersistTaps="never"
          timeTextStyle={{
            left: { color: COLORS.grayish },
            right: { color: COLORS.light },
          }}
          listViewProps={{ showsVerticalScrollIndicator: false }}
          isTyping={state.isTyping}
          inverted={Platform.OS !== 'web'}
          renderInputToolbar={(props) => (
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
          )}
          infiniteScroll
        />
        <EmojiPicker onEmojiSelected={handlePick} open={isOpen} onClose={() => setIsOpen(false)} />
        {/* </View> */}
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
