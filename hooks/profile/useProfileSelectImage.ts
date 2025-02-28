import { useUser } from '@clerk/clerk-expo';
import { useState } from 'react';

import { useProfileImageSelectionContext } from '~/context/ProfileImageSelectionContext';

const useProfileSelectImage = () => {
  const { user } = useUser();
  const [selectionLoading, setSelectionLoading] = useState(false);
  const { buttonsVisibility, selectedImage, resetSelectedImage } =
    useProfileImageSelectionContext();

  const saveProfileImage = async () => {
    setSelectionLoading(true);
    try {
      await user?.setProfileImage({ file: selectedImage });
    } catch (error) {
      console.error(error);
    } finally {
      resetSelectedImage();
      setSelectionLoading(false);
    }
  };

  return {
    user,
    selectionLoading,
    buttonsVisibility,
    selectedImage,
    resetSelectedImage,
    saveProfileImage,
  };
};

export default useProfileSelectImage;
