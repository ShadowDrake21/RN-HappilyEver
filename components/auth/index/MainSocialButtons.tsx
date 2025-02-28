import SocialButton from '@components/shared/SocialButton';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type MainSocialButtonsProps = {
  onSocialAuth: (type: 'google' | 'apple' | 'facebook') => void;
};

const MainSocialButtons = ({ onSocialAuth }: MainSocialButtonsProps) => {
  return (
    <View className="gap-2">
      <SocialButton
        icon="facebook-square"
        onPress={() => onSocialAuth('facebook')}
        socialName="Facebook"
      />
      <SocialButton icon="google" onPress={() => onSocialAuth('google')} socialName="Google" />
      <SocialButton icon="apple1" onPress={() => onSocialAuth('apple')} socialName="Apple" />
    </View>
  );
};

export default MainSocialButtons;
