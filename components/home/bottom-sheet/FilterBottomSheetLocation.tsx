import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { Text as PaperText } from 'react-native-paper';

import { COLORS } from '~/constants/colors';
import { defaultTitleStyles } from '~/constants/styles';
import { ICountry } from '~/types/country.types';
import { fetchCountries } from '~/utils/fetch.utils';

type FilterBottomSheetLocationProps = {
  selectedLocation: string;
  setSelectedLocation: React.Dispatch<React.SetStateAction<string>>;
};

const FilterBottomSheetLocation = ({
  selectedLocation,
  setSelectedLocation,
}: FilterBottomSheetLocationProps) => {
  const [isFocus, setIsFocus] = useState(false);

  const { data: allCountries, isLoading } = useQuery<ICountry[]>({
    queryFn: () => fetchCountries('https://restcountries.com/v3.1/all?fields=name,idd,cca2'),
    queryKey: ['allCountries'],
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
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={allCountries || []}
          search
          maxHeight={200}
          autoScroll={false}
          key={selectedLocation}
          dropdownPosition="top"
          labelField="name.common"
          valueField="id"
          placeholder={!isFocus ? 'Select item' : '...'}
          searchPlaceholder="Search..."
          value={selectedLocation}
          showsVerticalScrollIndicator={false}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(item: ICountry) => {
            setSelectedLocation(item.id);
            setIsFocus(false);
          }}
        />
      )}
    </View>
  );
};

export default FilterBottomSheetLocation;

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    borderColor: COLORS.grayish,
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 15,
    color: COLORS.text,
    backgroundColor: COLORS.extremelyDark,
  },

  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
    color: COLORS.text,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: COLORS.text,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
