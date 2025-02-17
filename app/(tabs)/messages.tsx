import MessageChatItem from '@components/messages/MessageChatItem';
import CustomLoader from '@components/ui/CustomLoader';
import React from 'react';
import { FlatList, View } from 'react-native';

import useFetchChats from '~/hooks/useFetchChats';
// TODO: Caching!!!

const Page = () => {
  const { compoundChats, loading } = useFetchChats();

  if (loading) return <CustomLoader />;
  return (
    <View className="flex-1 px-5 pt-5">
      <FlatList
        data={compoundChats}
        keyExtractor={(item) => item.chat_id.toString()}
        renderItem={({ item: chat }) => <MessageChatItem chat={chat} key={chat.chat_id} />}
        contentContainerStyle={{ gap: 10 }}
      />
    </View>
  );
};

export default Page;
