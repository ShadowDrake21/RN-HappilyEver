import SelectCalendar from '@components/shared/SelectCalendar';
import React from 'react';
import { Controller } from 'react-hook-form';
import CalendarPicker from 'react-native-calendar-picker';

import ProfileBasicFormError from '../ProfileBasicFormError';

import { ProfileBasicFormField } from '~/types/main-settings.types';
import { getFormRule } from '~/utils/forms.utils';

const ProfileBasicFormCalendar = ({ control, errors }: ProfileBasicFormField) => {
  return (
    <>
      <Controller
        control={control}
        rules={{
          required: getFormRule('required'),
        }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <CalendarPicker onDateChange={onChange} />
        )}
        name="birthDate"
      />
      {errors && <ProfileBasicFormError error={errors} style={{ marginHorizontal: 20 }} />}
    </>
  );
};

export default ProfileBasicFormCalendar;
