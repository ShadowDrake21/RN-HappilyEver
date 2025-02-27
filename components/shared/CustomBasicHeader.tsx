import HeaderLeftButton from '@components/main-settings/HeaderActionButton';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';
import { IconButton } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { COLORS } from '~/constants/colors';
import { useMainSettings } from '~/context/MainSettingsContext';

type CustomBasicHeaderProps = {
  title: string;
  onPressLeft: () => void;
  onPressRight: () => void;
};

const CustomBasicHeader = ({ title, onPressLeft, onPressRight }: CustomBasicHeaderProps) => {
  const { dispatch } = useMainSettings();
  const router = useRouter();
  const { top } = useSafeAreaInsets();

  return (
    <View className="w-full flex-row items-center pb-[15px]" style={{ paddingTop: top }}>
      <View className="absolute bottom-0 left-0 z-10">
        <HeaderLeftButton tintColor={COLORS.text} onPress={onPressLeft} />
      </View>
      <Text
        className="w-full text-center text-[20px] font-semibold"
        style={{
          color: COLORS.text,
        }}>
        {title}
      </Text>
      <View className="absolute bottom-0 right-0 z-10">
        <IconButton
          icon="check-circle"
          style={{ zIndex: 10 }}
          size={30}
          iconColor={COLORS.accent3}
          onPress={onPressRight}
        />
      </View>
    </View>
  );
};

export default CustomBasicHeader;
