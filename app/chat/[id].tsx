import { useAuth } from '@clerk/clerk-expo';
import ChatHeaderActions from '@components/chat/ChatHeaderActions';
import CustomGiftedChat from '@components/chat/CustomGiftedChat';
import HeaderLeftButton from '@components/main-settings/HeaderActionButton';
import CustomLoader from '@components/ui/CustomLoader';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import EmojiPicker from 'rn-emoji-keyboard';

import { COLORS } from '~/constants/colors';
import { useChatContext } from '~/context/ChatContext';
import { ActionKind } from '~/enums/chat.enum';
import useChatInterlocutor from '~/hooks/chat/useChatInterlocutor';
import useMessageListener from '~/hooks/listeners/useMessageListener';
import { useChatStore } from '~/store/chat.store';

const Page = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { bottom } = useSafeAreaInsets();
  const [chatLoading, setChatLoading] = useState(false);
  const { chats } = useChatStore();

  const {
    fetchInterlocutorImage,
    getInterlocutor,
    interlocutor,
    setInterlocutor,
    isLoadingInterlocutor,
    setIsLoadingInterlocutor,
  } = useChatInterlocutor();
  const { state, dispatch } = useChatContext();

  useMessageListener(state.currentChat?.chatId || 0);

  useEffect(() => {
    fetchData();
  }, [id, chats]);

  const fetchData = async () => {
    setChatLoading(true);
    const foundChat = chats.find((chat) => chat.chatId === +id);
    dispatch({ type: ActionKind.SET_CURRENT_CHAT, payload: foundChat });

    if (foundChat) {
      const fetchedInterlocutor = await getInterlocutor(foundChat.interlocutorId);
      setInterlocutor(fetchedInterlocutor);
      const image = await fetchInterlocutorImage(foundChat.interlocutorId);
      setInterlocutor((prev) => (prev ? { ...prev, image: image! } : prev));
    }

    setChatLoading(false);
    setIsLoadingInterlocutor(false);
  };

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
        <CustomGiftedChat interlocutor={interlocutor} />
        <EmojiPicker
          onEmojiSelected={(emoji) =>
            dispatch({
              type: ActionKind.SET_CURRENT_MESSAGE,
              payload: state.currentMessage + emoji,
            })
          }
          open={state.emojiOpen}
          onClose={() => dispatch({ type: ActionKind.SET_EMOJI_OPEN, payload: false })}
        />
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
