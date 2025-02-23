import CustomInput from '@components/ui/CustomInput';
import React from 'react';
import { Controller } from 'react-hook-form';
import { Image, View } from 'react-native';

import ProfileBasicFormError from '../ProfileBasicFormError';

import { ProfileBasicFormField } from '~/types/main-settings.types';
import { profilePhoneRules } from '~/utils/form-rules.utils';

type ProfileBasicFormPhoneProps = ProfileBasicFormField & {
  onFocus: () => void;
  flag: string;
};

const ProfileBasicFormPhone = ({ control, errors, onFocus, flag }: ProfileBasicFormPhoneProps) => {
  return (
    <>
      <Controller
        control={control}
        rules={profilePhoneRules}
        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
          <View className="mx-6 flex-row items-center gap-5">
            {flag && <Image source={{ uri: flag }} className="h-16 w-20" resizeMode="contain" />}
            <CustomInput
              placeholder="Phone Number"
              addStyle={{ flex: 1 }}
              errors={!!error}
              onBlur={onBlur}
              onChangeText={onChange}
              onFocus={onFocus}
              value={value}
              keyboardType="phone-pad"
            />
          </View>
        )}
        name="phoneNumber"
      />
      {errors && <ProfileBasicFormError error={errors} style={{ marginHorizontal: 20 }} />}
    </>
  );
};

export default ProfileBasicFormPhone;
