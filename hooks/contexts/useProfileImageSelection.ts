import { useState } from 'react';

import usePickImageFromGallery from '../image-picker/usePickProfileImageFromGallery';
import useTakeProfileImageByCamera from '../image-picker/useTakeProfileImageByCamera';

const useProfileImageSelection = () => {
  const [selectedImage, setSelectedImage] = useState('');
  const [buttonsVisibility, setButtonsVisibility] = useState(false);
  const [toggleBottomSheet, setToggleBottomSheet] = useState(false);

  const { pickFromGalleryAsync } = usePickImageFromGallery();
  const { takeByCameraAsync } = useTakeProfileImageByCamera();

  const handleImageSelection = async (action: 'gallery' | 'camera') => {
    try {
      const image = action === 'gallery' ? await pickFromGalleryAsync() : await takeByCameraAsync();
      setSelectedImage(image);
      setButtonsVisibility(true);
    } catch (error) {
      console.error(error);
      setToggleBottomSheet(false);
    }

    setToggleBottomSheet(false);
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
    handleImageSelection,
  };
};

export default useProfileImageSelection;
