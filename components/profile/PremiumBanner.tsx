import ParagraphText from '@components/ui/ParagraphText';
import SecondaryButton from '@components/ui/SecondaryButton';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, ImageBackground, StyleSheet, View } from 'react-native';
import { Text as PaperText } from 'react-native-paper';

import { COLORS } from '~/constants/colors';

const PremiumBanner = () => {
  const router = useRouter();
  return (
    <ImageBackground
      source={require('assets/premium-bg.jpg')}
      style={{ width: '100%', borderRadius: 20, overflow: 'hidden' }}
      blurRadius={3}
      resizeMode="cover">
      <View style={{ gap: 20, paddingHorizontal: 10, paddingVertical: 20, alignItems: 'center' }}>
        <Image
          source={require('assets/premium-profile.jpg')}
          style={{ width: 200, height: 200, borderRadius: 100 }}
        />
        <View style={{ flex: 1, width: '100%', justifyContent: 'center', gap: 10 }}>
          <PaperText
            variant="titleLarge"
            style={{ color: COLORS.text, textAlign: 'center', fontWeight: '700' }}>
            💖 Unlock Your Best Dating Experience!
          </PaperText>
          <ParagraphText style={{ textAlign: 'center' }}>
            Unlock exclusive features and connect faster! See who liked you, chat without limits,
            and boost your profile. Upgrade now and find your perfect match! 🚀
          </ParagraphText>
        </View>
        <SecondaryButton
          style={{ backgroundColor: COLORS.secondaryPurple }}
          onPress={() => router.push('/premium')}>
          Upgrade to Premium
        </SecondaryButton>
      </View>
    </ImageBackground>
  );
};

export default PremiumBanner;

const styles = StyleSheet.create({});
