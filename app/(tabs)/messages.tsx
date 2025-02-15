import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import useChatListener from '~/hooks/useChatListener';

const Page = () => {
  const { allChats, loading } = useChatListener();

  useEffect(() => {
    console.log('allChats', allChats);
  }, [allChats, loading]);

  return (
    <View>
      <Text>Page</Text>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({});
