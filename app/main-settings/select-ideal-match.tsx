import SelectIdealMathList from '@components/select-ideal-match/SelectIdealMathList';
import MainButtonLink from '@components/ui/MainButtonLink';
import ParagraphText from '@components/ui/ParagraphText';
import React from 'react';
import { View } from 'react-native';

const Page = () => {
  return (
    <View className="flex-1 gap-5">
      <ParagraphText style={{ paddingBottom: 0 }}>
        What are you looking for in a meaningful relationship?
      </ParagraphText>
      <SelectIdealMathList />
      <MainButtonLink href="./select-ideal-match">Continue</MainButtonLink>
    </View>
  );
};

export default Page;
