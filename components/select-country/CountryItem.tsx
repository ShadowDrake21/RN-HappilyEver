import React, { memo } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { Text as PaperText } from 'react-native-paper';

import CountryItemContent from './CountryItemContent';

import { COLORS } from '~/constants/colors';
import { unknownFlag } from '~/constants/links';
import { ICountry } from '~/types/country.types';

type CountryItemProps = {
  country: ICountry;
  onPress: (id: string) => void;
  isSelected: boolean;
};

const CountryItem = ({ country, onPress, isSelected }: CountryItemProps) => {
  return (
    <TouchableOpacity
      className="flex-row items-center justify-between gap-5 rounded-3xl border p-5"
      style={{
        backgroundColor: COLORS.extraDark,
        borderColor: isSelected ? COLORS.mainPurple : COLORS.slayish,
      }}
      onPress={() => onPress(country.id)}>
      <CountryItemContent country={country} />
      <View
        className="h-5 w-5 rounded-full border"
        style={[
          { borderColor: COLORS.mainPurple },
          isSelected && { backgroundColor: COLORS.mainPurple },
        ]}
      />
    </TouchableOpacity>
  );
};

export default memo(CountryItem);
