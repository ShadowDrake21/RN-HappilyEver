import Feather from '@expo/vector-icons/Feather';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { COLORS } from '~/constants/colors';

const HeaderActions = ({
  bottomSheetCurrent,
}: {
  bottomSheetCurrent: BottomSheetMethods | null;
}) => {
  const router = useRouter();
  return (
    <View className="flex-row items-center gap-3">
      <Pressable onPress={() => router.push('/search')}>
        <Feather name="search" size={24} color={COLORS.gray} />
      </Pressable>
      <Pressable
        onPress={() => {
          bottomSheetCurrent?.expand();
        }}>
        <Feather name="settings" size={24} color={COLORS.gray} />
      </Pressable>
    </View>
  );
};

export default HeaderActions;
