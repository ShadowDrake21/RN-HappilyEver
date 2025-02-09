import SmallParagraphText from '@components/ui/SmallParagraphText';
import Subtitle from '@components/ui/Subtitle';
import React from 'react';
import { Image, Pressable } from 'react-native';

import { COLORS } from '~/constants/colors';
import { profileIdealMatchIcons } from '~/content/profile-ideal-match.content';
import { useMainSettings } from '~/context/MainSettingsContext';
import { ProfileIdealMatch } from '~/types/main-settings.types';

const SelectIdealMathListItem = ({ item }: { item: ProfileIdealMatch }) => {
  const { state, dispatch } = useMainSettings();

  return (
    <Pressable
      onPress={() => dispatch({ type: 'SET_IDEAL_MATCH', payload: item })}
      className="flex-1 items-center justify-between gap-2 rounded-3xl border border-transparent p-4"
      style={[
        { backgroundColor: COLORS.extraDark },
        state.idealMatch?.id === item.id && { borderColor: COLORS.mainPurple },
      ]}>
      <Image
        source={profileIdealMatchIcons[item.id as keyof typeof profileIdealMatchIcons]}
        className="h-[100px] w-[100px]"
      />
      <Subtitle style={{ paddingBottom: 0 }}>{item.title}</Subtitle>
      <SmallParagraphText style={{ textAlign: 'center' }}>{item.description}</SmallParagraphText>
    </Pressable>
  );
};

export default SelectIdealMathListItem;
