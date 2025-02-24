import { format } from 'date-fns';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import { Icon } from 'react-native-paper';
import { useSharedValue } from 'react-native-reanimated';

import BottomSheet from '../ui/BottomSheet';

import { COLORS } from '~/constants/colors';

type SelectCalendarProps = {
  value: Date | undefined;
  onChange: (...event: any[]) => void;
  error: boolean;
};

const SelectCalendar = ({ value, onChange, error }: SelectCalendarProps) => {
  const isOpen = useSharedValue(false);

  const toggleSheet = () => {
    isOpen.value = !isOpen.value;
  };

  const collapseSheet = () => {
    isOpen.value = false;
  };
  return (
    <>
      <TouchableOpacity
        style={[styles.toggleButton, error && { borderWidth: 1, borderColor: 'red' }]}
        onPress={toggleSheet}>
        <Text style={styles.toggleButtonText}>
          {value ? format(value, 'do MMMM yyyy') : 'Select your birth day'}
        </Text>
        <Icon source="calendar" color={COLORS.grayish} size={20} />
      </TouchableOpacity>
      <BottomSheet isOpen={isOpen} onPress={collapseSheet}>
        <CalendarPicker onDateChange={onChange} />
      </BottomSheet>
    </>
  );
};

export default SelectCalendar;

const styles = StyleSheet.create({
  toggleButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.extraDark,
    padding: 12,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    marginHorizontal: 20,
  },
  toggleButtonText: {
    padding: 8,
    fontSize: 18,
    fontWeight: '500',
    color: COLORS.text,
    textTransform: 'capitalize',
    textAlign: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});
