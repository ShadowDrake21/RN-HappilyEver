import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-paper';

import { COLORS } from '~/constants/colors';
import { SelectedFormItem } from '~/types/main-settings.types';

type CustomSelectDropdownButtonProps = {
  selectedItem: SelectedFormItem;
  isOpened: boolean;
  error: boolean;
};

const CustomSelectDropdownButton = ({
  selectedItem,
  isOpened,
  error,
}: CustomSelectDropdownButtonProps) => {
  return (
    <View style={[styles.dropdownButton, error && { borderColor: 'red', borderWidth: 1 }]}>
      {selectedItem && <Icon source={selectedItem.icon} color={COLORS.grayish} size={20} />}
      <Text style={styles.dropdownButtonText}>
        {(selectedItem && selectedItem.title) || 'Select your gender'}
      </Text>
      <Icon source={isOpened ? 'chevron-down' : 'chevron-up'} color={COLORS.grayish} size={20} />
    </View>
  );
};

export default CustomSelectDropdownButton;

const styles = StyleSheet.create({
  dropdownButton: {
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
  dropdownButtonText: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: COLORS.text,
    textTransform: 'capitalize',
    textAlign: 'center',
  },
});
