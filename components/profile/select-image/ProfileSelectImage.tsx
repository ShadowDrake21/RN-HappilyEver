import React from 'react';
import { View } from 'react-native';

import ProfileSelectImageActions from './ProfileSelectImageActions';
import ProfileSelectImageButton from './ProfileSelectImageButton';
import ProfileSelectImageLoading from './ProfileSelectImageLoading';

import useProfileSelectImage from '~/hooks/profile/useProfileSelectImage';

const ProfileSelectImage = ({ onImagePress }: { onImagePress: () => void }) => {
  const {
    buttonsVisibility,
    resetSelectedImage,
    saveProfileImage,
    selectedImage,
    selectionLoading,
    user,
  } = useProfileSelectImage();

  return (
    <View className="relative flex-1">
      <View className="flex-row gap-[15px] self-center">
        <View className="self-center">
          <ProfileSelectImageButton
            onImagePress={onImagePress}
            selectedImage={selectedImage}
            imageUrl={user?.imageUrl}
          />
        </View>
        {buttonsVisibility && (
          <ProfileSelectImageActions
            saveProfileImage={saveProfileImage}
            resetSelectedImage={resetSelectedImage}
          />
        )}
        {selectionLoading && <ProfileSelectImageLoading />}
      </View>
    </View>
  );
};

export default ProfileSelectImage;
