import TextLink from '@components/ui/TextLink';
import { Href } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';

import { COLORS } from '~/constants/colors';

type AuthBottomLinkProps = {
  text: string;
  link: { href: Href; text: string };
};

const AuthBottomLink = ({ text, link }: AuthBottomLinkProps) => {
  return (
    <View className="flex-row items-center justify-center gap-2 self-center py-5 ">
      <Text style={{ color: COLORS.text }}>{text}</Text>
      <TextLink href={typeof link.href === 'string' ? link.href : ''}>{link.text}</TextLink>
    </View>
  );
};

export default AuthBottomLink;
