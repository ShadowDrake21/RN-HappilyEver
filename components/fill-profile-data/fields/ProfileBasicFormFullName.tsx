import CustomInput from '@components/ui/CustomInput';
import React from 'react';
import { Controller } from 'react-hook-form';

import ProfileBasicFormError from '../ProfileBasicFormError';

import { ProfileBasicFormField } from '~/types/main-settings.types';
import { getFormRule } from '~/utils/forms.utils';

const ProfileBasicFormFullName = ({ control, errors }: ProfileBasicFormField) => {
  return (
    <>
      <Controller
        control={control}
        rules={{
          required: getFormRule('required'),
          minLength: { value: 3, message: getFormRule('minLength', 3) },
          maxLength: { value: 40, message: getFormRule('maxLength', 40) },
        }}
        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
          <CustomInput
            errors={!!error}
            placeholder="Full Name"
            addStyle={{ marginHorizontal: 20 }}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="fullName"
      />
      {errors && <ProfileBasicFormError error={errors} style={{ marginHorizontal: 20 }} />}
    </>
  );
};

export default ProfileBasicFormFullName;
