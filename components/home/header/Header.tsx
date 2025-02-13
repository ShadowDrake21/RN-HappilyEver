import { useUser } from '@clerk/clerk-expo';
import Feather from '@expo/vector-icons/Feather';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Text as PaperText } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import HeaderActions from './HeaderActions';
import HeaderContent from './HeaderContent';

const Header = ({ bottomSheetCurrent }: { bottomSheetCurrent: BottomSheetMethods | null }) => {
  const { top } = useSafeAreaInsets();

  return (
    <View className="flex-row items-center justify-between p-4" style={{ paddingTop: top }}>
      <HeaderContent />
      <HeaderActions bottomSheetCurrent={bottomSheetCurrent} />
    </View>
  );
};

export default Header;
