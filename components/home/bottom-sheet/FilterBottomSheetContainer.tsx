import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text as PaperText } from 'react-native-paper';

import FilterBottomSheetAge from './age/FilterBottomSheetAge';
import FilterBottomSheetGender from './gender/FilterBottomSheetGender';
import FilterBottomSheetLocation from './location/FilterBottomSheetLocation';

import { defaultTitleStyles } from '~/constants/styles';
import { Gender } from '~/types/shared.types';

const FilterBottomSheetContainer = () => {
  const [selectedGender, setSelectedGender] = useState<Gender>('male');
  const [selectedAgeRange, setSelectedAgeRange] = useState([18, 25]);
  const [selectedLocation, setSelectedLocation] = useState('');

  return (
    <View>
      <PaperText variant="headlineMedium" style={[defaultTitleStyles, styles.title]}>
        Filter
      </PaperText>
      <View className="gap-5 pb-10">
        <FilterBottomSheetGender
          selectedGender={selectedGender}
          setSelectedGender={setSelectedGender}
        />
        <FilterBottomSheetAge
          selectedAgeRange={selectedAgeRange}
          setSelectedAgeRange={setSelectedAgeRange}
        />
        <FilterBottomSheetLocation
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
        />
      </View>
    </View>
  );
};

export default FilterBottomSheetContainer;

const styles = StyleSheet.create({
  title: { paddingBottom: 20, textAlign: 'center' },
});
