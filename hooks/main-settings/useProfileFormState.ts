import BottomSheet from '@gorhom/bottom-sheet';
import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';

import useProfileCountryDetailsFetching from './useProfileCountryDetailsFetching';
import useProfileBasicForm from '../forms/useProfileBasicForm';

import { unknownFlag } from '~/constants/links';
import { isFormDisabled } from '~/utils/forms.utils';

const useProfileFormState = () => {
  const router = useRouter();
  const bottomSheetRef = useRef<BottomSheet>(null);

  const [isOpen, setIsOpen] = useState(false);

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

    if (isFormDisabled(formValues)) return;
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

  return {
    bottomSheetRef,
    isOpen,
    isLoading,
    control,
    errors,
    onFocusPhoneNumber,
    phoneFlag,
    onFormSubmit,
    toggleSheet,
    collapseSheet,
    getValues,
  };
};

export default useProfileFormState;
