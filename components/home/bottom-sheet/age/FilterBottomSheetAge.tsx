import MultiSlider from '@ptomasroos/react-native-multi-slider';
import React from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';

import FilterSectionTitle from '../FilterSectionTitle';
import CustomLabel from './SliderLabel';

import { COLORS } from '~/constants/colors';

type FilterBottomSheetAgeProps = {
  selectedAgeRange: number[];
  setSelectedAgeRange: React.Dispatch<React.SetStateAction<number[]>>;
};

const FilterBottomSheetAge = ({
  selectedAgeRange,
  setSelectedAgeRange,
}: FilterBottomSheetAgeProps) => {
  const { width } = useWindowDimensions();
  const multiSliderValuesChange = (values: number[]) => setSelectedAgeRange(values);

  return (
    <View>
      <FilterSectionTitle>Age</FilterSectionTitle>
      <MultiSlider
        values={[selectedAgeRange[0], selectedAgeRange[1]]}
        containerStyle={styles.container}
        trackStyle={styles.track}
        onValuesChange={multiSliderValuesChange}
        selectedStyle={{ backgroundColor: COLORS.mainPurple }}
        sliderLength={width - 40}
        min={18}
        max={100}
        step={1}
        allowOverlap
        snapped
        markerStyle={styles.marker}
        enableLabel
        customLabel={(props) => CustomLabel(props)}
      />
    </View>
  );
};

export default FilterBottomSheetAge;

const styles = StyleSheet.create({
  container: { width: '100%' },
  track: { width: '100%' },
  marker: { height: 20, width: 20 },
});
