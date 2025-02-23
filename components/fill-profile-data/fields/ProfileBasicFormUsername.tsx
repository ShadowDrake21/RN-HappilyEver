import CustomInput from '@components/ui/CustomInput';
import React from 'react';
import { Controller, RegisterOptions } from 'react-hook-form';

import ProfileBasicFormError from '../ProfileBasicFormError';

import { ProfileBasicFormField } from '~/types/main-settings.types';
import { profileUsernameRules } from '~/utils/form-rules.utils';

const ProfileBasicFormUsername = ({
  control,
  errors,
  autoCapitalize = 'none',
}: ProfileBasicFormField) => {
  return (
    <>
      <Controller
        control={control}
        rules={profileUsernameRules}
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
