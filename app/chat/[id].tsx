import Chat from '@components/chat/Chat';
import ChatHeaderActions from '@components/chat/ChatHeaderActions';
import HeaderLeftButton from '@components/main-settings/HeaderActionButton';
import CustomLoader from '@components/ui/CustomLoader';
import { Stack, useRouter } from 'expo-router';
import React, { useCallback } from 'react';
import { Text, View } from 'react-native';

import { COLORS } from '~/constants/colors';
import { useChatContext } from '~/context/ChatContext';
import useFetchChatData from '~/hooks/chat/useFetchChatData';
import useMessageListener from '~/hooks/listeners/useMessageListener';

const Page = () => {
  const router = useRouter();
  const { chatLoading, interlocutor, isLoadingInterlocutor } = useFetchChatData();
  const { state } = useChatContext();

  useMessageListener(state.currentChat?.chatId || 0);

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
      <Chat interlocutor={interlocutor} />
    </>
  );
};

export default Page;
