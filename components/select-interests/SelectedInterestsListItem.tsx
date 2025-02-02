import ParagraphText from '@components/ui/ParagraphText';
import React from 'react';

import { profileInterests } from '~/content/profile-interests.content';
import { ProfileInterestsIds } from '~/types/main-settings.types';
import { getInterestsLine } from '~/utils/format.utils';

const SelectedInterestsListItem = ({ interest }: { interest: ProfileInterestsIds }) => {
  const category = profileInterests.find((item) => item.id === interest.categoryId);
  return (
    <ParagraphText style={{ paddingBottom: 0 }}>
      <ParagraphText style={{ fontWeight: 700 }}>{category?.category}</ParagraphText>:
      {getInterestsLine(category, interest)}
    </ParagraphText>
  );
};

export default SelectedInterestsListItem;
