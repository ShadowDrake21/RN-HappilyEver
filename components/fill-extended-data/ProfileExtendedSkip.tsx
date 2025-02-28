import TextLink from '@components/ui/TextLink';
import React from 'react';
import { View } from 'react-native';

const ProfileExtendedSkip = () => {
  return (
    <View className="flex-row justify-end">
      <TextLink href="./add-photos" classes="py-4">
        Skip for now
      </TextLink>
    </View>
  );
};

export default ProfileExtendedSkip;
