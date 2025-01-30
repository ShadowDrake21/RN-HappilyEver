import SelectIdealMathList from '@components/select-ideal-match/SelectIdealMathList';
import MainButton from '@components/ui/MainButton';
import ParagraphText from '@components/ui/ParagraphText';
import React from 'react';
import { View } from 'react-native';

import { useMainSettings } from '~/context/MainSettingsContext';
import { setProfileQuestions } from '~/supabase/supabaseQueries';

const Page = () => {
  const { state, dispatch } = useMainSettings();

  const onSaveData = () => {
    // if (state.profileExtendedForm) setProfileQuestions(state.profileExtendedForm);
  };

  return (
    <View className="flex-1 gap-5">
      <ParagraphText style={{ paddingBottom: 0 }}>
        What are you looking for in a meaningful relationship?
      </ParagraphText>
      <SelectIdealMathList />
      <MainButton onPress={onSaveData}>Finish</MainButton>
    </View>
  );
};

export default Page;
