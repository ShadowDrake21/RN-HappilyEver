import MessageChatItem from '@components/messages/MessageChatItem';
import CustomLoader from '@components/ui/CustomLoader';
import React, { useCallback } from 'react';
import { FlatList, View } from 'react-native';

import useFetchChats from '~/hooks/fetching/useFetchChats';
// TODO: Caching!!!

const Page = () => {
  const { compoundChats, loading } = useFetchChats();

  const renderChats = useCallback(
    () => (
      <FlatList
        data={compoundChats}
        keyExtractor={(item) => item.chat_id.toString()}
        renderItem={({ item: chat }) => <MessageChatItem chat={chat} key={chat.chat_id} />}
        contentContainerStyle={{ gap: 10 }}
      />
    ),
    [compoundChats]
  );

  if (loading) return <CustomLoader />;
  return <View className="flex-1 px-5 pt-5">{renderChats()}</View>;
};

export default Page;
