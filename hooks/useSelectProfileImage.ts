import { useUser } from '@clerk/clerk-expo';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';

const useSelectProfileImage = ({
  selectedProfileImage,
  setSelectedProfileImage,
}: {
  selectedProfileImage: string;
  setSelectedProfileImage: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const { user } = useUser();
  const [buttonsVisibitity, setButtonsVisibitity] = useState(false);

  const pickImageAsync = async (bottomSheetRef: React.RefObject<BottomSheetMethods>) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      setSelectedProfileImage('data:image/jpeg;base64,' + result.assets[0].base64 || '');

      setButtonsVisibitity(true);
      bottomSheetRef.current?.close();
    } else {
      Alert.alert('You did not select any image.');
    }
  };

  const takeImageAsync = async (bottomSheetRef: React.RefObject<BottomSheetMethods>) => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      setSelectedProfileImage(result.assets[0].base64 || '');
      setButtonsVisibitity(true);
      bottomSheetRef.current?.close();
    } else {
      alert('You did not take any image.');
    }
  };

  const saveProfileImage = () => {
    return user?.setProfileImage({ file: selectedProfileImage }).then(() => {
      setButtonsVisibitity(false);
      setSelectedProfileImage('');
    });
  };

  const resetSelectedImage = () => {
    setSelectedProfileImage('');
    setButtonsVisibitity(false);
  };

  return {
    selectedProfileImage,
    buttonsVisibitity,
    pickImageAsync,
    takeImageAsync,
    saveProfileImage,
    resetSelectedImage,
  };
};

export default useSelectProfileImage;
