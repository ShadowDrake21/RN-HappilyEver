import MatchActions from '@components/match/MatchActions';
import MatchImages from '@components/match/MatchImages';
import MatchText from '@components/match/MatchText';
import CustomLoader from '@components/ui/CustomLoader';
import { Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { COLORS } from '~/constants/colors';
import useFetchMatch from '~/hooks/fetching/useFetchMatch';

// TODO: MESSAGES

const Page = () => {
  const { top, bottom } = useSafeAreaInsets();

  const { id } = useLocalSearchParams<{
    id: string;
  }>();
  const { users, loading, getChatId } = useFetchMatch(+id);

  if (loading) return <CustomLoader />;

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
          contentStyle: { backgroundColor: COLORS.extraDark },
        }}
      />
      <View
        style={{
          paddingTop: 100 + top,
          paddingBottom: bottom,
        }}
        className="max-w-full flex-1 justify-between px-5">
        <MatchImages firstUrl={users.firstUser.image} secondUrl={users.secondUser.image} />
        <MatchText />
        <MatchActions chatId={getChatId()} />
      </View>
    </>
  );
};

export default Page;
