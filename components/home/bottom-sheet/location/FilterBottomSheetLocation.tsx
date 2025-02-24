import React from 'react';
import { View } from 'react-native';
import { Text as PaperText } from 'react-native-paper';

import FilterBottomSheetLocationDropdown from './FilterBottomSheetLocationDropdown';

import { defaultTitleStyles } from '~/constants/styles';
import useFetchCountries from '~/hooks/fetching/useFetchCountries';

type FilterBottomSheetLocationProps = {
  selectedLocation: string;
  setSelectedLocation: React.Dispatch<React.SetStateAction<string>>;
};

const FilterBottomSheetLocation = ({
  selectedLocation,
  setSelectedLocation,
}: FilterBottomSheetLocationProps) => {
  const { data: allCountries, isLoading } = useFetchCountries({
    url: 'https://restcountries.com/v3.1/all',
    config: { params: { fields: 'name,idd,cca2' } },
    queryKey: ['countries'],
  });

  return (
    <View>
      <PaperText
        variant="titleLarge"
        style={[defaultTitleStyles, { paddingBottom: 20, fontWeight: '400', textAlign: 'left' }]}>
        Location
      </PaperText>

      {isLoading ? (
        <PaperText>Loading...</PaperText>
      ) : (
        <FilterBottomSheetLocationDropdown
          allCountries={allCountries}
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
        />
      )}
    </View>
  );
};

export default FilterBottomSheetLocation;
