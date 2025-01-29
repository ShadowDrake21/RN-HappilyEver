import React from 'react';
import { List } from 'react-native-paper';

import SelectInterestsAccordionItem from './SelectInterestsAccordionItem';

import { ProfileInterestsCategory } from '~/types/main-settings.types';

const SelectInterestsAccordion = ({
  categoryItem: { id: categoryId, category, interests },
}: {
  categoryItem: ProfileInterestsCategory;
}) => {
  return (
    <List.Accordion title={category} id={categoryId}>
      {interests.map((item) => (
        <SelectInterestsAccordionItem categoryId={categoryId} interest={item} key={item.id} />
      ))}
    </List.Accordion>
  );
};

export default SelectInterestsAccordion;
