import CustomInput from '@components/ui/CustomInput';
import React from 'react';
import { Controller } from 'react-hook-form';

import ProfileBasicFormError from '../ProfileBasicFormError';

import { ProfileBasicFormField } from '~/types/main-settings.types';
import { getFormRule } from '~/utils/forms.utils';

const ProfileBasicFormOccupation = ({ control, errors }: ProfileBasicFormField) => {
  return (
    <>
      <Controller
        control={control}
        rules={{
          required: getFormRule('required'),
          minLength: {
            value: 6,
            message: getFormRule('minLength', 6),
          },
          maxLength: {
            value: 30,
            message: getFormRule('maxLength', 30),
          },
        }}
        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
          <CustomInput
            errors={!!error}
            placeholder="Occupation"
            addStyle={{ marginHorizontal: 20 }}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="occupation"
      />
      {errors && <ProfileBasicFormError error={errors} style={{ marginHorizontal: 20 }} />}
    </>
  );
};

export default ProfileBasicFormOccupation;
