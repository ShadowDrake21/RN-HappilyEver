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
import { useMainSettings } from '~/context/MainSettingsContext';
import useFetchCountries from '~/hooks/useFetchCountries';
import useProfileBasicForm from '~/hooks/useProfileBasicForm';

const ProfileBasicForm = () => {
  const router = useRouter();
  const { state } = useMainSettings();

  const { data: countries, isLoading } = useFetchCountries({
    url: `https://restcountries.com/v3.1/alpha/${state.countryId}`,
    config: { params: { fields: 'name,flags,idd,cca2' } },
    queryKey: ['countries'],
  });

  const { control, getValues, errors, setValue, submit } = useProfileBasicForm();

  const onFocusPhoneNumber = () => {
    if (getValues('phoneNumber').length === 0) {
      setValue('phoneNumber', countries![0].phoneCode);
    }
  };

  const phoneFlag = countries ? countries[0].flags.png : unknownFlag;

  const onFormSubmit = () => {
    submit();
    router.push('/main-settings/fill-extended-data');
  };

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
