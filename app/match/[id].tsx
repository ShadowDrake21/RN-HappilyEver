import Match from '@components/match/Match';
import CustomLoader from '@components/ui/CustomLoader';
import { Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';

import { COLORS } from '~/constants/colors';
import useFetchMatch from '~/hooks/fetching/useFetchMatch';

const Page = () => {
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
      <Match
        firstUrl={users.firstUser.image}
        secondUrl={users.secondUser.image}
        chatId={getChatId()}
      />
    </>
  );
};

export default Page;
