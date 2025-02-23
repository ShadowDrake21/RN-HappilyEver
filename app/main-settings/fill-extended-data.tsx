import ProfileExtended from '@components/fill-extended-data/ProfileExtended';
import ProfileExtendedSkip from '@components/fill-extended-data/ProfileExtendedSkip';
import MainButton from '@components/ui/MainButton';
import { useRouter } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

import useProfileExtendedForm from '~/hooks/forms/useProfileExtendedForm';

const Page = () => {
  const { submit } = useProfileExtendedForm();
  const router = useRouter();

  const onSubmit = async () => {
    await submit();
    router.push('/main-settings/add-photos');
  };

  return (
    <>
      <ProfileExtended />
      <View className=" flex-row items-center justify-between gap-5 pt-10">
        <MainButton onPress={onSubmit} style={{ flex: 1 }}>
          Continue
        </MainButton>
        <ProfileExtendedSkip />
      </View>
    </>
  );
};

export default Page;
