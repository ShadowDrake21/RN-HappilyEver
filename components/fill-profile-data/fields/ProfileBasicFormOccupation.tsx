import CustomInput from '@components/ui/CustomInput';
import React from 'react';
import { Controller } from 'react-hook-form';

import ProfileBasicFormError from '../ProfileBasicFormError';

import { ProfileBasicFormField } from '~/types/main-settings.types';
import { profileOccupationRules } from '~/utils/form-rules.utils';

const ProfileBasicFormOccupation = ({ control, errors }: ProfileBasicFormField) => {
  return (
    <>
      <Controller
        control={control}
        rules={profileOccupationRules}
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
