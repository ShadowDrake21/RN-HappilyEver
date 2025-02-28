import { format } from 'date-fns';
import React from 'react';
import { FieldError } from 'react-hook-form';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-paper';

import { COLORS } from '~/constants/colors';

type ProfileBasicFormCalendarButtonProps = {
  errors: FieldError | undefined;
  value: Date | undefined;
  toggleSheet: () => void;
};

const ProfileBasicFormCalendarButton = ({
  errors,
  value,
  toggleSheet,
}: ProfileBasicFormCalendarButtonProps) => {
  return (
    <TouchableOpacity
      style={[styles.toggleButton, errors && { borderWidth: 1, borderColor: 'red' }]}
      onPress={toggleSheet}>
      <Text style={styles.toggleButtonText}>
        {value ? format(value!, 'do MMMM yyyy') : 'Select your birth day'}
      </Text>
      <Icon source="calendar" color={COLORS.grayish} size={20} />
    </TouchableOpacity>
  );
};

export default ProfileBasicFormCalendarButton;

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
