import MatchActions from '@components/match/MatchActions';
import MatchImages from '@components/match/MatchImages';
import MatchText from '@components/match/MatchText';
import CustomLoader from '@components/ui/CustomLoader';
import { Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { COLORS } from '~/constants/colors';
import useRetrieveMatch from '~/hooks/useRetrieveMatch';

// TODO: FILTER OUT ALL PROFILES THAT USER HAS ALREADY MATCHED WITH OR LIKED
// TODO: MESSAGES

const Page = () => {
  const { top, bottom } = useSafeAreaInsets();

  const { user1_id, user2_id } = useLocalSearchParams<{
    id: string;
    user1_id: string;
    user2_id: string;
  }>();
  const { users, loading, getChatId } = useRetrieveMatch({ user1_id, user2_id });

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
