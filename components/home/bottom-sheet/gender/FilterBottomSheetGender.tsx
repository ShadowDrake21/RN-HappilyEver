import React from 'react';
import { View } from 'react-native';

import FilterSectionTitle from '../FilterSectionTitle';
import GenderButton from './GenderButton';

import { COLORS } from '~/constants/colors';
import { Gender } from '~/types/shared.types';

const FilterBottomSheetGender = ({
  selectedGender,
  setSelectedGender,
}: {
  selectedGender: Gender;
  setSelectedGender: React.Dispatch<React.SetStateAction<Gender>>;
}) => {
  return (
    <View>
      <FilterSectionTitle>Gender</FilterSectionTitle>
      <View className="flex-row justify-center gap-2">
        {(['male', 'female'] as const).map((gender) => (
          <GenderButton
            key={gender}
            borderColor={selectedGender === gender ? COLORS.secondaryPurple : COLORS.mainPurple}
            backgroundColor={selectedGender === gender ? COLORS.mainPurple : COLORS.secondaryPurple}
            onPress={() => setSelectedGender(gender)}
            textColor={selectedGender === gender ? COLORS.text : COLORS.mainPurple}>
            Male
          </GenderButton>
        ))}
      </View>
    </View>
  );
};

export default FilterBottomSheetGender;
