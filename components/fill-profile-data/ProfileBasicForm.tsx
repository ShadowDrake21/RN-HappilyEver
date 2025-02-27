import CustomBasicHeader from '@components/shared/CustomBasicHeader';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import ProfileBasicFormCalendarContainer from './containers/ProfileBasicFormCalendarContainer';
import ProfileBasicFormDropdown from './fields/ProfileBasicFormDropdown';
import ProfileBasicFormFullName from './fields/ProfileBasicFormFullName';
import ProfileBasicFormOccupation from './fields/ProfileBasicFormOccupation';
import ProfileBasicFormPhone from './fields/ProfileBasicFormPhone';
import ProfileBasicFormUsername from './fields/ProfileBasicFormUsername';
import ProfileBasicFormCalendarButton from './ui/ProfileBasicFormCalendarButton';

import { useMainSettings } from '~/context/MainSettingsContext';
import useProfileFormState from '~/hooks/main-settings/useProfileFormState';

const ProfileBasicForm = () => {
  const {
    control,
    bottomSheetRef,
    collapseSheet,
    errors,
    getValues,
    toggleSheet,
    phoneFlag,
    onFocusPhoneNumber,
    onFormSubmit,
  } = useProfileFormState();
  const { dispatch } = useMainSettings();
  const router = useRouter();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <CustomBasicHeader
        title="Fill Your Profile"
        onPressLeft={() => {
          dispatch({ type: 'SET_PROFILE_BASIC_FORM', payload: undefined });
          router.back();
        }}
        onPressRight={onFormSubmit}
      />
      <ScrollView>
        <View className="gap-[15px] pt-5">
          <ProfileBasicFormFullName control={control} errors={errors.fullName} />
          <ProfileBasicFormUsername control={control} errors={errors.username} />
          <ProfileBasicFormDropdown control={control} errors={errors.gender} />
          <ProfileBasicFormCalendarButton
            errors={errors.birthDate}
            value={getValues('birthDate')}
            toggleSheet={toggleSheet}
          />
          <ProfileBasicFormPhone
            control={control}
            errors={errors.phoneNumber}
            onFocus={onFocusPhoneNumber}
            flag={phoneFlag}
          />
          <ProfileBasicFormOccupation control={control} errors={errors.occupation} />
        </View>
      </ScrollView>
      <ProfileBasicFormCalendarContainer
        bottomSheetRef={bottomSheetRef}
        collapseSheet={collapseSheet}
        control={control}
        errors={errors.birthDate}
      />
    </GestureHandlerRootView>
  );
};

export default ProfileBasicForm;
