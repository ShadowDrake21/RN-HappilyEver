import AddPhotos from '@components/add-photos/AddPhotos';
import MainButtonLink from '@components/ui/MainButtonLink';
import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import useRequestGalleryPermissions from '~/hooks/image-picker/useRequestGalleryPermissions';

const Page = () => {
  const { bottom } = useSafeAreaInsets();
  useRequestGalleryPermissions();

  return (
    <View className="flex-1 justify-between" style={{ paddingBottom: bottom }}>
      <AddPhotos />
      <MainButtonLink href="./select-interests">Continue</MainButtonLink>
    </View>
  );
};

export default Page;
