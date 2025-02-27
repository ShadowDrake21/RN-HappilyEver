import ProfileExtended from '@components/fill-extended-data/ProfileExtended';
import ProfileExtendedSkip from '@components/fill-extended-data/ProfileExtendedSkip';
import CustomBasicHeader from '@components/shared/CustomBasicHeader';
import MainButton from '@components/ui/MainButton';
import { useRouter } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

import { useMainSettings } from '~/context/MainSettingsContext';
import useProfileExtendedForm from '~/hooks/forms/useProfileExtendedForm';

const Page = () => {
  // const { submit } = useProfileExtendedForm();
  const router = useRouter();

  // const onSubmit = async () => {
  //   await submit();
  //   router.push('/main-settings/add-photos');
  // };
  const { dispatch } = useMainSettings();

  return (
    <>
      <CustomBasicHeader
        title="Fill Extended Information"
        onPressLeft={() => {
          dispatch({ type: 'SET_PROFILE_EXTENDED_FORM', payload: undefined });
          router.back();
        }}
        onPressRight={() => router.push('/main-settings/add-photos')}
      />
      <ProfileExtended />
      <View className=" flex-row items-center  justify-end gap-5 pt-10">
        <ProfileExtendedSkip />
      </View>
    </>
  );
};

export default Page;
