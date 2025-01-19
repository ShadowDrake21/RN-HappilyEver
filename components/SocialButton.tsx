import AntDesign from '@expo/vector-icons/AntDesign';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { IconProps } from 'react-native-paper/lib/typescript/components/MaterialCommunityIcon';

import { COLORS } from '~/constants/colors';

const SocialButton = ({
  onPress,
  icon,
  iconProps = { size: 24, color: 'white' },
  socialName,
}: {
  onPress: () => void;
  icon: keyof typeof AntDesign.glyphMap;
  iconProps?: Partial<Omit<IconProps, 'name'>>;
  socialName: string;
}) => {
  return (
    <TouchableOpacity
      className="w-full flex-row items-center justify-center gap-2 rounded-xl py-5"
      style={{ backgroundColor: COLORS.lightDark }}
      onPress={onPress}>
      <AntDesign name={icon} {...iconProps} />
      <Text className="font-poppins-medium text-white">Continue with Facebook</Text>
    </TouchableOpacity>
  );
};

export default SocialButton;

const styles = StyleSheet.create({});
