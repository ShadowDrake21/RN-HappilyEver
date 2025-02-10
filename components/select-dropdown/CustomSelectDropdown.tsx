import React from 'react';
import { StyleSheet } from 'react-native';
import SelectDropdown, { SelectDropdownProps } from 'react-native-select-dropdown';

import CustomSelectDropdownButton from './CustomSelectDropdownButton';
import CustomSelectDropdownItem from './CustomSelectDropdownItem';

import { SelectedFormItem } from '~/types/main-settings.types';

type CustomSelectDropdownProps = {
  data: any[];
  onSelect: (selectedItem: any, index: number) => void;
  error: boolean;
} & Partial<SelectDropdownProps>;

const CustomSelectDropdown = ({
  data,
  onSelect,
  error,
  ...dropdownProps
}: CustomSelectDropdownProps) => {
  return (
    <SelectDropdown
      {...dropdownProps}
      onSelect={onSelect}
      data={data}
      renderButton={(selectedItem: SelectedFormItem, isOpened) => (
        <>
          <CustomSelectDropdownButton
            selectedItem={selectedItem}
            isOpened={isOpened}
            error={error}
          />
        </>
      )}
      renderItem={(item: SelectedFormItem, _, isSelected) => (
        <>
          <CustomSelectDropdownItem item={item} isSelected={isSelected} />
        </>
      )}
      showsVerticalScrollIndicator={false}
      dropdownStyle={styles.dropdownMenuStyle}
    />
  );
};

export default CustomSelectDropdown;

const styles = StyleSheet.create({
  dropdownMenuStyle: {
    flex: 1,
    backgroundColor: '#E9ECEF',
    borderRadius: 8,
  },
  dropdownButtonArrowStyle: {
    fontSize: 28,
  },
});
