import { Link } from 'expo-router';
import React from 'react';
import { Image, Text, View } from 'react-native';
import { Button } from 'react-native-paper';

import SmallDisplayTitle from './ui/SmallDisplayTitle';

import { COLORS } from '~/constants/colors';
import { IOnboardingContent } from '~/types/onboarding.types';

const OnboardingContent = ({ pageItem }: { pageItem: IOnboardingContent }) => {
  return (
    <View className="flex-1 justify-between">
      <Image source={pageItem.image} className="h-[400] w-full" resizeMode="contain" />
      <SmallDisplayTitle>{pageItem.text}</SmallDisplayTitle>
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
            contentStyle={{ paddingVertical: 5 }}
            style={{ borderRadius: 30 }}>
            <Text>{pageItem.nextText}</Text>
          </Button>
        </Link>
      </View>
    </View>
  );
};

export default OnboardingContent;
