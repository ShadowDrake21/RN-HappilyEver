import ParagraphText from '@components/ui/ParagraphText';
import React from 'react';

import SelectedInterestsListItem from './SelectedInterestsListItem';

import { useMainSettings } from '~/context/MainSettingsContext';

const SelectedInterestsList = () => {
  const { state } = useMainSettings();

  return state.interests.length > 0 ? (
    <>
      <ParagraphText style={{ paddingBottom: 0 }}>You have selected: </ParagraphText>
      {state.interests.map((interest, index) => (
        <SelectedInterestsListItem key={index} interest={interest} />
      ))}
    </>
  ) : undefined;
};

export default SelectedInterestsList;
