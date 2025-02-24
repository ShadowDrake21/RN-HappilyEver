import AntDesign from '@expo/vector-icons/AntDesign';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { IconProps } from 'react-native-paper/lib/typescript/components/MaterialCommunityIcon';

import { COLORS } from '~/constants/colors';

const SocialButton = ({
  onPress,
  icon,
  iconProps = { size: 24, color: 'white' },
  socialName,
  isStandaloneIcon = false,
}: {
  onPress: () => void;
  icon: keyof typeof AntDesign.glyphMap;
  iconProps?: Partial<Omit<IconProps, 'name'>>;
  socialName: string;
  isStandaloneIcon?: boolean;
}) => {
  return (
    <TouchableOpacity
      className={`${isStandaloneIcon ? 'px-10 py-5' : 'w-full p-5'} flex-row items-center justify-center gap-2 rounded-xl `}
      style={{ backgroundColor: COLORS.lightDark }}
      onPress={onPress}>
      <AntDesign name={icon} {...iconProps} />
      {!isStandaloneIcon ? (
        <Text className="font-poppins-medium text-white">Continue with {socialName}</Text>
      ) : null}
    </TouchableOpacity>
  );
};

export default SocialButton;

const styles = StyleSheet.create({});
