import { useUser } from '@clerk/clerk-expo';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';

import usePickImageFromGallery from './usePickProfileImageFromGallery';

// TODO: refactoring
const useSelectProfileImage = () => {
  const { user } = useUser();

  const { pickFromGalleryAsync, pickedImageFromGallery, reset, pickButtons } =
    usePickImageFromGallery();

  const saveProfileImage = () => {
    return user?.setProfileImage({ file: pickedImageFromGallery }).then(() => reset());
  };

  return {
    pickFromGalleryAsync,
    pickedImageFromGallery,
    saveProfileImage,
    resetSelectedImage: reset,
    buttonsVisibility: pickButtons,
  };
};

export default useSelectProfileImage;
