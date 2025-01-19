import { Link } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Button, Text as PaperText } from 'react-native-paper';

import { COLORS } from '~/constants/colors';
import { IOnboardingContent } from '~/types/onboarding.types';

const OnboardingContent = ({ pageItem }: { pageItem: IOnboardingContent }) => {
  return (
    <View className="flex-1 justify-between">
      <Image source={pageItem.image} className="h-[400] w-full" resizeMode="contain" />
      <PaperText
        variant="displaySmall"
        style={{
          color: COLORS.text,
          textAlign: 'center',
          fontFamily: 'Poppins-Regular',
          fontWeight: '600',
        }}>
        {pageItem.text}
      </PaperText>
      <View>
        {pageItem.isSkipAvailable && (
          <Link href="/auth" asChild>
            <Button mode="text" textColor={COLORS.accent2} style={{ paddingVertical: 10 }}>
              <Text>Skip</Text>
            </Button>
          </Link>
        )}
        <Link href={pageItem.nextRoute as any} asChild>
          <Button
            mode="contained"
            buttonColor={COLORS.accent3}
            style={{ paddingVertical: 5, borderRadius: 30 }}>
            <Text>{pageItem.nextText}</Text>
          </Button>
        </Link>
      </View>
    </View>
  );
};

export default OnboardingContent;

const styles = StyleSheet.create({});
