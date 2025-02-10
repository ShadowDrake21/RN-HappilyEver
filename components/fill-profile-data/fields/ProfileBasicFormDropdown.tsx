import CustomSelectDropdown from '@components/select-dropdown/CustomSelectDropdown';
import React from 'react';
import { Controller } from 'react-hook-form';

import ProfileBasicFormError from '../ProfileBasicFormError';

import { genders } from '~/content/profile-basic-form.content';
import { ProfileBasicFormField } from '~/types/main-settings.types';
import { getFormRule } from '~/utils/forms.utils';

const ProfileBasicFormDropdown = ({ control, errors }: ProfileBasicFormField) => {
  return (
    <>
      <Controller
        control={control}
        rules={{
          required: getFormRule('required'),
        }}
        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
          <CustomSelectDropdown
            data={genders}
            onSelect={(selectedItem) => onChange(selectedItem.title)}
            onBlur={onBlur}
            defaultValue={value}
            error={!!error}
          />
        )}
        name="gender"
      />
      {errors && <ProfileBasicFormError error={errors} style={{ marginHorizontal: 20 }} />}
    </>
  );
};

export default ProfileBasicFormDropdown;

//REFACTOR
