import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-paper';

import { COLORS } from '~/constants/colors';
import { SelectedFormItem } from '~/types/main-settings.types';

const CustomSelectDropdownItem = ({
  item,
  isSelected,
}: {
  item: SelectedFormItem;
  isSelected: boolean;
}) => {
  return (
    <View
      style={{
        ...styles.dropdownItem,
        ...(isSelected && { backgroundColor: '#D2D9DF' }),
      }}>
      <Icon source={item.icon} color={COLORS.mainPurple} size={20} />
      <Text style={styles.dropdownItemText}>{item.title}</Text>
    </View>
  );
};

export default CustomSelectDropdownItem;

const styles = StyleSheet.create({
  dropdownItem: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 12,
    alignItems: 'center',
    paddingVertical: 8,
  },
  dropdownItemText: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#151E26',
    textTransform: 'capitalize',
    textAlign: 'center',
  },
});
