import { useState } from 'react';

import usePickImageFromGallery from '../image-picker/usePickProfileImageFromGallery';
import useTakeProfileImageByCamera from '../image-picker/useTakeProfileImageByCamera';

const useProfileImageSelection = () => {
  const [selectedImage, setSelectedImage] = useState('');
  const [buttonsVisibility, setButtonsVisibility] = useState(false);
  const [toggleBottomSheet, setToggleBottomSheet] = useState(false);

  const { pickFromGalleryAsync } = usePickImageFromGallery();
  const { takeByCameraAsync } = useTakeProfileImageByCamera();

  const onActionWithImage = async (action: 'gallery' | 'camera') => {
    let image = '';
    switch (action) {
      case 'gallery':
        image = await pickFromGalleryAsync();
        break;
      case 'camera':
        image = await takeByCameraAsync();
        break;
      default:
        console.error('Invalid action');
        break;
    }

    setSelectedImage(image);
    setButtonsVisibility(true);
  };

  const resetSelectedImage = () => {
    setSelectedImage('');
    setButtonsVisibility(false);
  };

  return {
    selectedImage,
    setSelectedImage,
    buttonsVisibility,
    setButtonsVisibility,
    toggleBottomSheet,
    setToggleBottomSheet,
    resetSelectedImage,
    onActionWithImage,
  };
};

export default useProfileImageSelection;
