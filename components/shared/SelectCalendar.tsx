import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { format } from 'date-fns';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import { Icon } from 'react-native-paper';
import { useSharedValue } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { COLORS } from '~/constants/colors';
import { useMainSettingsCalendarContext } from '~/context/MainSettingsCalendarContext';

type SelectCalendarProps = {
  value: Date | undefined;
  onChange: (...event: any[]) => void;
  error: boolean;
};

const SelectCalendar = ({ value, onChange, error }: SelectCalendarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const { bottom } = useSafeAreaInsets();

  const toggleSheet = () => {
    setIsOpen(!isOpen);
  };

  const collapseSheet = () => {
    setIsOpen(false);
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
      <BottomSheet
        ref={bottomSheetRef}
        onClose={collapseSheet}
        snapPoints={['40%']}
        enablePanDownToClose
        backgroundStyle={styles.photoSelectorBackground}
        containerStyle={styles.photoSelectorContainer}
        handleIndicatorStyle={styles.photoSelectorHandle}
        index={-1}>
        <BottomSheetScrollView
          contentContainerStyle={{ paddingBottom: bottom, gap: 15 }}
          style={{ padding: 20 }}>
          <CalendarPicker onDateChange={onChange} />
        </BottomSheetScrollView>
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
  photoSelectorBackground: { backgroundColor: COLORS.dark, borderRadius: 25 },
  photoSelectorContainer: { flex: 1, borderTopLeftRadius: 20, borderTopRightRadius: 20 },
  photoSelectorHandle: { backgroundColor: COLORS.extremelyDark },
});
