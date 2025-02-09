import { createContext, PropsWithChildren, useContext, useState } from 'react';

import usePickImageFromGallery from '~/hooks/usePickProfileImageFromGallery';
import useTakeProfileImageByCamera from '~/hooks/useTakeProfileImageByCamera';

type ProfileImageSelectionContextType = {
  selectedImage: string;
  setSelectedImage: React.Dispatch<React.SetStateAction<string>>;
  buttonsVisibility: boolean;
  setButtonsVisibility: React.Dispatch<React.SetStateAction<boolean>>;
  toggleBottomSheet: boolean;
  setToggleBottomSheet: React.Dispatch<React.SetStateAction<boolean>>;
  resetSelectedImage: () => void;
  onActionWithImage: (action: 'gallery' | 'camera') => Promise<void>;
};

const ProfileImageSelectionContext = createContext<ProfileImageSelectionContextType | undefined>(
  undefined
);

export const ProfileImageSelectionProvider = ({ children }: PropsWithChildren) => {
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

  return (
    <ProfileImageSelectionContext.Provider
      value={{
        selectedImage,
        setSelectedImage,
        buttonsVisibility,
        setButtonsVisibility,
        toggleBottomSheet,
        setToggleBottomSheet,
        resetSelectedImage,
        onActionWithImage,
      }}>
      {children}
    </ProfileImageSelectionContext.Provider>
  );
};

export const useProfileImageSelectionContext = () => {
  const context = useContext(ProfileImageSelectionContext);

  if (!context) {
    throw new Error(
      'useProfileImageSelectionContext must be within a ProfileImageSelectionProvider'
    );
  }

  return context;
};
