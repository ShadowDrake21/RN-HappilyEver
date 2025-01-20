import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Text as PaperText } from 'react-native-paper';

import SocialButton from '../SocialButton';

import { COLORS } from '~/constants/colors';

const AuthSocials = ({ action = 'Sign in' }: { action?: 'Sign in' | 'Sign up' }) => {
  return (
    <>
      <PaperText variant="titleMedium" style={styles.title}>
        {action} with socials:
      </PaperText>
      <View className="flex-row items-center justify-center gap-2">
        <SocialButton
          icon="facebook-square"
          onPress={() => console.log('facebook')}
          socialName="Facebook"
          isStandaloneIcon
        />
        <SocialButton
          icon="google"
          onPress={() => console.log('Google')}
          socialName="Google"
          isStandaloneIcon
        />
        <SocialButton
          icon="apple1"
          onPress={() => console.log('Apple')}
          socialName="Apple"
          isStandaloneIcon
        />
      </View>
    </>
  );
};

export default AuthSocials;

const styles = StyleSheet.create({
  title: { color: COLORS.text, textAlign: 'center', paddingTop: 20, paddingBottom: 15 },
});
