import ParagraphText from '@components/ui/ParagraphText';
import SecondaryButton from '@components/ui/SecondaryButton';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Text as PaperText } from 'react-native-paper';

import { COLORS } from '~/constants/colors';

const PremiumBannerContent = () => {
  const router = useRouter();

  return (
    <View className="items-center gap-5 px-[10px] py-[20px]">
      <Image
        source={require('assets/premium-profile.jpg')}
        className="h-[200px] w-[200px] rounded-[100px]"
        resizeMode="cover"
      />
      <View className="w-full flex-1 justify-center gap-[10px]">
        <PaperText variant="titleLarge" style={styles.title}>
          💖 Unlock Your Best Dating Experience!
        </PaperText>
        <ParagraphText style={{ textAlign: 'center' }}>
          Unlock exclusive features and connect faster! See who liked you, chat without limits, and
          boost your profile. Upgrade now and find your perfect match! 🚀
        </ParagraphText>
      </View>
      <SecondaryButton
        style={{ backgroundColor: COLORS.secondaryPurple }}
        onPress={() => router.push('/premium')}>
        Upgrade to Premium
      </SecondaryButton>
    </View>
  );
};

export default PremiumBannerContent;

const styles = StyleSheet.create({
  title: {
    color: COLORS.text,
    textAlign: 'center',
    fontWeight: '700',
  },
});
