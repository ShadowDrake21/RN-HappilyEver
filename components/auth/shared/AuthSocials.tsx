import CustomLoader from '@components/ui/CustomLoader';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text as PaperText } from 'react-native-paper';

import SocialButton from '../../shared/SocialButton';

import { COLORS } from '~/constants/colors';
import useAuthSocials from '~/hooks/auth/useAuthSocials';

const AuthSocials = ({ action = 'Sign in' }: { action?: 'Sign in' | 'Sign up' }) => {
  const { onSocialAuth, isLoading } = useAuthSocials();

  if (isLoading) return <CustomLoader />;

  return (
    <>
      <PaperText variant="titleMedium" style={styles.title}>
        {action} with socials:
      </PaperText>
      <View className="flex-row items-center justify-center gap-2">
        <SocialButton
          icon="facebook-square"
          onPress={() => onSocialAuth('facebook')}
          socialName="Facebook"
          isStandaloneIcon
        />
        <SocialButton
          icon="google"
          onPress={() => onSocialAuth('google')}
          socialName="Google"
          isStandaloneIcon
        />
        <SocialButton
          icon="apple1"
          onPress={() => onSocialAuth('apple')}
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
