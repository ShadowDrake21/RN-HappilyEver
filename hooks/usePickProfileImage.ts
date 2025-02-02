import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';

import { useMainSettings } from '~/context/MainSettingsContext';
import { ProfilePhoto } from '~/types/main-settings.types';
import { callToast } from '~/utils/ui.utils';

const usePickProfileImage = () => {
  const { state, dispatch } = useMainSettings();
  const [selectedImage, setSelectedImage] = useState<ProfilePhoto | null>(null);

  const pickImageAsync = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      if (state.photos.find((photo) => photo.name === result.assets[0].fileName)) {
        callToast({
          type: 'error',
          text1: 'Image picking error!',
          text2: 'You already added this image.',
        });
      } else {
        const updatedPhotos = [
          ...state.photos.filter((photo) => photo.name !== selectedImage?.name),
          {
            name: result.assets[0].fileName!,
            base64: result.assets[0].base64!,
          },
        ];

        setSelectedImage({
          name: result.assets[0].fileName!,
          base64: result.assets[0].base64!,
        });

        dispatch({ type: 'SET_PHOTOS', payload: updatedPhotos });
      }
    } else {
      callToast({
        type: 'error',
        text1: 'Image picking error!',
        text2: 'You did not select any image.',
      });
    }
  };

  return {
    selectedImage,
    pickImage: pickImageAsync,
  };
};

export default usePickProfileImage;
