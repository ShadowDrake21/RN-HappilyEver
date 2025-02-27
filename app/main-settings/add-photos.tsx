import AddPhotos from '@components/add-photos/AddPhotos';
import CustomBasicHeader from '@components/shared/CustomBasicHeader';
import MainButtonLink from '@components/ui/MainButtonLink';
import { useRouter } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useMainSettings } from '~/context/MainSettingsContext';
import useRequestGalleryPermissions from '~/hooks/image-picker/useRequestGalleryPermissions';

const Page = () => {
  const { bottom } = useSafeAreaInsets();
  useRequestGalleryPermissions();
  const router = useRouter();
  const { dispatch } = useMainSettings();

  return (
    <>
      <CustomBasicHeader
        title="Add Your Best Photos"
        onPressLeft={() => {
          dispatch({ type: 'SET_PHOTOS', payload: [] });
          router.back();
        }}
        onPressRight={() => router.push('/main-settings/add-photos')}
      />
      <View className="flex-1 justify-between" style={{ paddingBottom: bottom }}>
        <AddPhotos />
        <MainButtonLink href="./select-interests">Continue</MainButtonLink>
      </View>
    </>
  );
};

export default Page;
