import HeaderLeftButton from '@components/main-settings/HeaderActionButton';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { COLORS } from '~/constants/colors';
import { useMainSettings } from '~/context/MainSettingsContext';

const CustomBasicHeader = () => {
  const { dispatch } = useMainSettings();
  const router = useRouter();
  const { top } = useSafeAreaInsets();

  return (
    <View
      style={{
        width: '100%',
        paddingTop: top,
        paddingBottom: 15,
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
      }}>
      <View className="absolute bottom-0 left-0 z-10">
        <HeaderLeftButton
          tintColor={COLORS.text}
          onPress={() => {
            dispatch({ type: 'SET_PROFILE_BASIC_FORM', payload: undefined });
            router.back();
          }}
        />
      </View>
      <Text
        style={{
          width: '100%',
          fontSize: 20,
          fontWeight: 600,
          color: COLORS.text,
          textAlign: 'center',
        }}>
        Fill Your Profile
      </Text>
    </View>
  );
};

export default CustomBasicHeader;
