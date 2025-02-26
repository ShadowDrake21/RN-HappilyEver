import CustomBasicHeader from '@components/shared/CustomBasicHeader';
import MainButton from '@components/ui/MainButton';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import { format } from 'date-fns';
import { useRouter } from 'expo-router';
import React, { useCallback, useRef, useState } from 'react';
import { Controller } from 'react-hook-form';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Icon } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import ProfileBasicFormError from './ProfileBasicFormError';
import ProfileBasicFormDropdown from './fields/ProfileBasicFormDropdown';
import ProfileBasicFormFullName from './fields/ProfileBasicFormFullName';
import ProfileBasicFormOccupation from './fields/ProfileBasicFormOccupation';
import ProfileBasicFormPhone from './fields/ProfileBasicFormPhone';
import ProfileBasicFormUsername from './fields/ProfileBasicFormUsername';

import { COLORS } from '~/constants/colors';
import { unknownFlag } from '~/constants/links';
import useProfileBasicForm from '~/hooks/forms/useProfileBasicForm';
import useProfileCountryDetailsFetching from '~/hooks/main-settings/useProfileCountryDetailsFetching';
import { getFormRule, isFormDisabled } from '~/utils/forms.utils';

const ProfileBasicForm = () => {
  const router = useRouter();
  const bottomSheetRef = useRef<BottomSheet>(null);

  const [isOpen, setIsOpen] = useState(false);

  const { bottom } = useSafeAreaInsets();
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

  const toggleSheet = () => {
    setIsOpen(!isOpen);
    if (isOpen) {
      bottomSheetRef.current?.close();
    } else {
      bottomSheetRef.current?.expand();
    }
  };

  const collapseSheet = () => {
    setIsOpen(false);
    bottomSheetRef.current?.close();
  };

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        onPress={() => bottomSheetRef.current?.close()}
      />
    ),
    []
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <CustomBasicHeader />
      <View className="flex-1 gap-[15px] pt-5">
        <ProfileBasicFormFullName control={control} errors={errors.fullName} />
        <ProfileBasicFormUsername control={control} errors={errors.username} />
        <ProfileBasicFormDropdown control={control} errors={errors.gender} />
        <TouchableOpacity
          style={[styles.toggleButton, errors.birthDate && { borderWidth: 1, borderColor: 'red' }]}
          onPress={toggleSheet}>
          <Text style={styles.toggleButtonText}>
            {getValues().birthDate
              ? format(getValues().birthDate!, 'do MMMM yyyy')
              : 'Select your birth day'}
          </Text>
          <Icon source="calendar" color={COLORS.grayish} size={20} />
        </TouchableOpacity>{' '}
        <ProfileBasicFormPhone
          control={control}
          errors={errors.phoneNumber}
          onFocus={onFocusPhoneNumber}
          flag={phoneFlag}
        />
        <ProfileBasicFormOccupation control={control} errors={errors.occupation} />
      </View>
      <View
        style={{ backgroundColor: COLORS.dark, paddingBottom: bottom, paddingTop: 20 }}
        className="px-5">
        <MainButton onPress={onFormSubmit}>Continue</MainButton>
      </View>
      <BottomSheet
        ref={bottomSheetRef}
        onClose={collapseSheet}
        snapPoints={['50%']}
        enablePanDownToClose
        backdropComponent={renderBackdrop}
        containerStyle={{ zIndex: 100 }}
        // backgroundStyle={styles.photoSelectorBackground}
        // containerStyle={styles.photoSelectorContainer}
        // handleIndicatorStyle={styles.photoSelectorHandle}
        index={-1}>
        <BottomSheetScrollView
          contentContainerStyle={{ paddingBottom: bottom, gap: 15 }}
          style={{ padding: 20 }}>
          <>
            <Controller
              control={control}
              rules={{
                required: getFormRule('required'),
              }}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <CalendarPicker onDateChange={onChange} />
              )}
              name="birthDate"
            />
            {errors.birthDate && (
              <ProfileBasicFormError error={errors.birthDate} style={{ marginHorizontal: 20 }} />
            )}
          </>
        </BottomSheetScrollView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

export default ProfileBasicForm;

const styles = StyleSheet.create({
  toggleButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.extraDark,
    padding: 12,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    marginHorizontal: 20,
  },
  toggleButtonText: {
    padding: 8,
    fontSize: 18,
    fontWeight: '500',
    color: COLORS.text,
    textTransform: 'capitalize',
    textAlign: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  // photoSelectorBackground: { backgroundColor: COLORS.dark, borderRadius: 25 },
  // photoSelectorContainer: { flex: 1, borderTopLeftRadius: 20, borderTopRightRadius: 20 },
  // photoSelectorHandle: { backgroundColor: COLORS.extremelyDark },
});
