import SelectIdealMathList from '@components/select-ideal-match/SelectIdealMathList';
import MainButton from '@components/ui/MainButton';
import ParagraphText from '@components/ui/ParagraphText';
import React from 'react';
import { View } from 'react-native';

import useSaveMainSettings from '~/hooks/useMainSettingsOperations';

const Page = () => {
  const { saveMainSettings } = useSaveMainSettings();

  return (
    <View className="flex-1 gap-5">
      <ParagraphText style={{ paddingBottom: 0 }}>
        What are you looking for in a meaningful relationship?
      </ParagraphText>
      <SelectIdealMathList />
      <MainButton onPress={saveMainSettings}>Finish</MainButton>
    </View>
  );
};

export default Page;
