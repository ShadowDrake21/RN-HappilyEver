import React from 'react';
import { FlatList } from 'react-native';

import SelectIdealMathListItem from './SelectIdealMathListItem';

import { profileIdealMatch } from '~/content/profile-ideal-match.content';

const SelectIdealMathList = () => {
  return (
    <FlatList
      data={profileIdealMatch}
      contentContainerClassName="gap-[15px]"
      columnWrapperClassName="gap-[15px]"
      renderItem={({ item }) => <SelectIdealMathListItem item={item} />}
      numColumns={2}
      keyExtractor={(item) => item.id}
    />
  );
};

export default SelectIdealMathList;
