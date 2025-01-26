import React from 'react';
import { Controller } from 'react-hook-form';

import PhoneInput from '../PhoneInput';
import ProfileBasicFormError from '../ProfileBasicFormError';

import { ProfileBasicFormField } from '~/types/main-settings.types';
import { getFormRule } from '~/utils/forms.utils';

const ProfileBasicFormPhone = ({
  control,
  errors,
  onFocus,
  flag,
}: ProfileBasicFormField & { onFocus: () => void; flag: string }) => {
  return (
    <>
      <Controller
        control={control}
        rules={{
          required: getFormRule('required'),
          pattern: {
            value: /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/,
            message: getFormRule('pattern'),
          },
          minLength: {
            value: 10,
            message: getFormRule('minLength', 10),
          },
          maxLength: {
            value: 15,
            message: getFormRule('maxLength', 15),
          },
        }}
        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
          <PhoneInput
            errors={!!error}
            flag={flag}
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            onFocus={onFocus}
          />
        )}
        name="phoneNumber"
      />
      {errors && <ProfileBasicFormError error={errors} style={{ marginHorizontal: 20 }} />}
    </>
  );
};

export default ProfileBasicFormPhone;
