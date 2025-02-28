import ActivityBadge from '@components/shared/ActivityBadge';
import React from 'react';
import { View } from 'react-native';
import { Text as PaperText } from 'react-native-paper';

import { ICountry } from '~/types/country.types';
import { IUserProfile } from '~/types/user.types';
import { getFullYears } from '~/utils/helpers.utils';

type SwipperItemContentProps = { item: IUserProfile; country: ICountry[] | undefined };

const SwipperItemContent = ({ item, country }: SwipperItemContentProps) => {
  const isUserActive = true;

  return (
    <View className="absolute bottom-10 left-0 w-full flex-row items-center p-4">
      <View>
        <PaperText variant="headlineMedium" style={{ color: 'white', fontWeight: 700 }}>
          {item.fullName.split(' ')[0]}, {getFullYears(item.birthDate)}
        </PaperText>
        <PaperText variant="titleSmall" style={{ color: 'white' }}>
          {item.occupation}, {country?.[0]?.name?.common}
        </PaperText>
      </View>
      <View className="flex-1 items-center ">
        <ActivityBadge isUserActive={isUserActive} />
      </View>
    </View>
  );
};

export default SwipperItemContent;
