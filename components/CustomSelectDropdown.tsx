import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-paper';
import SelectDropdown, { SelectDropdownProps } from 'react-native-select-dropdown';

import { COLORS } from '~/constants/colors';
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
  useEffect(() => {
    console.log('data', data);
  }, []);
  return (
    <SelectDropdown
      {...dropdownProps}
      onSelect={onSelect}
      data={data}
      renderButton={(selectedItem: SelectedFormItem, isOpened) => {
        return (
          <View
            style={[styles.dropdownButtonStyle, error && { borderColor: 'red', borderWidth: 1 }]}>
            {selectedItem && <Icon source={selectedItem.icon} color={COLORS.grayish} size={20} />}
            <Text style={styles.dropdownButtonTxtStyle}>
              {(selectedItem && selectedItem.title) || 'Select your gender'}
            </Text>
            <Icon
              source={isOpened ? 'chevron-down' : 'chevron-up'}
              color={COLORS.grayish}
              size={20}
            />
          </View>
        );
      }}
      renderItem={(item: SelectedFormItem, index, isSelected) => (
        <View
          style={{
            ...styles.dropdownItemStyle,
            ...(isSelected && { backgroundColor: '#D2D9DF' }),
          }}>
          <Icon source={item.icon} color={COLORS.mainPurple} size={20} />
          <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
        </View>
      )}
      showsVerticalScrollIndicator={false}
      dropdownStyle={styles.dropdownMenuStyle}
    />
  );
};

export default CustomSelectDropdown;

const styles = StyleSheet.create({
  dropdownMenuStyle: {
    backgroundColor: '#E9ECEF',
    borderRadius: 8,
    flex: 1,
  },
  dropdownButtonStyle: {
    marginHorizontal: 20,
    height: 50,
    backgroundColor: COLORS.extraDark,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: COLORS.text,
    textTransform: 'capitalize',
    textAlign: 'center',
  },
  dropdownButtonArrowStyle: {
    fontSize: 28,
  },
  dropdownButtonIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  dropdownItemStyle: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 12,

    alignItems: 'center',
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#151E26',
    textTransform: 'capitalize',
    textAlign: 'center',
  },
});
