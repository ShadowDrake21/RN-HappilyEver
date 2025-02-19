import CustomInput from '@components/ui/CustomInput';
import React from 'react';
import { Controller } from 'react-hook-form';

import ProfileBasicFormError from '../ProfileBasicFormError';

import { ProfileBasicFormField } from '~/types/main-settings.types';
import { getFormRule } from '~/utils/forms.utils';

const ProfileBasicFormUsername = ({
  control,
  errors,
  autoCapitalize = 'none',
}: ProfileBasicFormField) => {
  return (
    <>
      <Controller
        control={control}
        rules={{
          required: getFormRule('required'),
          minLength: { value: 3, message: getFormRule('minLength', 3) },
          maxLength: {
            value: 25,
            message: getFormRule('maxLength', 25),
          },
        }}
        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
          <CustomInput
            errors={!!error}
            placeholder="Username"
            addStyle={{ marginHorizontal: 20 }}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize={autoCapitalize}
            autoCorrect={false}
          />
        )}
        name="username"
      />
      {errors && <ProfileBasicFormError error={errors} style={{ marginHorizontal: 20 }} />}
    </>
  );
};

export default ProfileBasicFormUsername;
