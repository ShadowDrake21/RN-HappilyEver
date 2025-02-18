import { useAuth } from '@clerk/clerk-expo';
import NavBar from '@components/chat/NavBar';
import HeaderLeftButton from '@components/main-settings/HeaderActionButton';
import CustomLoader from '@components/ui/CustomLoader';
import Entypo from '@expo/vector-icons/Entypo';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { Bubble, GiftedChat } from 'react-native-gifted-chat';
import { TextInput, useTheme } from 'react-native-paper';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import EmojiPicker, { type EmojiType } from 'rn-emoji-keyboard';

import { COLORS } from '~/constants/colors';
import { useChatContext } from '~/context/ChatContext';
import useChatActions from '~/hooks/useChatActions';
import { useChatStore } from '~/store/chat.store';
import { getProfileById } from '~/supabase/supabase-typed.requests';
import { InterlocutorType } from '~/types/chat.types';
import { ChatStoreItem } from '~/types/store.types';
import { fetchUserProfileImage } from '~/utils/fetch.utils';
import { renderCustomActions, renderSend, renderSystemMessage } from '~/utils/renderChatFunctions';

const user = {
  _id: 1,
  name: 'Developer',
  avatar: 'https://placeimg.com/140/140/any',
};

const Page = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { bottom } = useSafeAreaInsets();
  const [chatLoading, setChatLoading] = useState(false);
  const { getToken, userId } = useAuth();
  const { state } = useChatContext();
  const { onSend, onLoadEarlier, onPressAvatar, onSendFromUser } = useChatActions(user);
  const { chats } = useChatStore();
  const [currentChat, setCurrentChat] = useState<ChatStoreItem | undefined>(undefined);
  const [interlocutor, setInterlocutor] = useState<InterlocutorType | undefined>(undefined);
  const [message, setMessage] = useState('');
  const theme = useTheme();
  const { colors } = theme;

  useEffect(() => {
    setChatLoading(true);
    setCurrentChat(chats.find((chat) => chat.chatId === +id));
    getInterlocutor();
    fetchInterlocutorImage();
    setChatLoading(false);
  }, [id, currentChat]);

  const fetchInterlocutorImage = async () => {
    const token = await getToken({ template: 'supabase' });

    if (!token || !currentChat) return;
    const profileUrl = await fetchUserProfileImage(token, currentChat.interlocutorId);
    setInterlocutor((prev) => (prev ? { ...prev, image: profileUrl } : undefined));
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

  const handlePick = (emojiObject: EmojiType) => {
    console.log(emojiObject);
    setMessage((prev) => prev + emojiObject.emoji);
  };

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
        {/* <View style={[styles.fill, styles.content]}> */}
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
                  backgroundColor: COLORS.messagePurple, // Custom background for sent messages
                  borderRadius: 10,
                  padding: 8,
                },
              }}
              textStyle={{
                left: {
                  color: '#000', // Custom text color for received messages
                },
                right: {
                  color: '#fff', // Custom text color for sent messages
                },
              }}
            />
          )}
          keyboardShouldPersistTaps="never"
          //TODO: justify content for time
          timeTextStyle={{
            left: { color: COLORS.grayish, justifyContent: 'flex-end' },
            right: { color: COLORS.light, justifyContent: 'flex-end' },
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
                  onChangeText={(text) => setMessage(text)}
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
                className="rounded-full p-4">
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
