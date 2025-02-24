import MainButton from '@components/ui/MainButton';
import { useRouter } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

import { COLORS } from '~/constants/colors';

const MatchActions = ({ chatId }: { chatId: number | undefined }) => {
  const router = useRouter();

  return (
    <View className="gap-5">
      <MainButton
        onPress={() => router.replace(`/chat/${chatId}`)}
        style={{
          backgroundColor: COLORS.mainPurple,
        }}>
        Say Hello
      </MainButton>
      <MainButton
        onPress={() => router.replace('/(tabs)/home')}
        style={{
          backgroundColor: COLORS.extremelyDark,
        }}>
        Keep Swiping
      </MainButton>
    </View>
  );
};

export default MatchActions;
