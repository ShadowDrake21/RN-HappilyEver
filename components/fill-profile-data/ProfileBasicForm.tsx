import MainButton from '@components/ui/MainButton';
import { useRouter } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

import ProfileBasicFormCalendar from './fields/ProfileBasicFormCalendar';
import ProfileBasicFormDropdown from './fields/ProfileBasicFormDropdown';
import ProfileBasicFormFullName from './fields/ProfileBasicFormFullName';
import ProfileBasicFormOccupation from './fields/ProfileBasicFormOccupation';
import ProfileBasicFormPhone from './fields/ProfileBasicFormPhone';
import ProfileBasicFormUsername from './fields/ProfileBasicFormUsername';

import { unknownFlag } from '~/constants/links';
import useProfileBasicForm from '~/hooks/forms/useProfileBasicForm';
import useProfileCountryDetailsFetching from '~/hooks/main-settings/useProfileCountryDetailsFetching';
import { isFormDisabled } from '~/utils/forms.utils';

const ProfileBasicForm = () => {
  const router = useRouter();
  const { countries, isLoading } = useProfileCountryDetailsFetching();

  const { control, getValues, errors, setValue, submit } = useProfileBasicForm();
  const onFocusPhoneNumber = () => {
    if (getValues('phoneNumber').length === 0) {
      setValue('phoneNumber', countries![0].phoneCode);
    }
  };
  const phoneFlag = countries ? countries[0].flags.png : unknownFlag;

  const onFormSubmit = () => {
    submit();

    if (isDisabled) return;
    router.push('/main-settings/fill-extended-data');
  };

  const formValues = {
    fullName: getValues('fullName'),
    username: getValues('username'),
    gender: getValues('gender'),
    birthDate: getValues('birthDate'),
    phoneNumber: getValues('phoneNumber'),
    occupation: getValues('occupation'),
  };

  const isDisabled = isFormDisabled(formValues);

  return (
    <View className="flex-1 gap-[15] pt-5">
      <ProfileBasicFormFullName control={control} errors={errors.fullName} />
      <ProfileBasicFormUsername control={control} errors={errors.username} />
      <ProfileBasicFormDropdown control={control} errors={errors.gender} />
      <ProfileBasicFormCalendar control={control} errors={errors.birthDate} />
      <ProfileBasicFormPhone
        control={control}
        errors={errors.phoneNumber}
        onFocus={onFocusPhoneNumber}
        flag={phoneFlag}
      />
      <ProfileBasicFormOccupation control={control} errors={errors.occupation} />

      <View className="mx-5">
        <MainButton onPress={onFormSubmit}>Continue</MainButton>
      </View>
    </View>
  );
};

export default ProfileBasicForm;
