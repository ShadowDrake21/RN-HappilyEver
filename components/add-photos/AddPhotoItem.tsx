import AntDesign from '@expo/vector-icons/AntDesign';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

import { COLORS } from '~/constants/colors';
import { useMainSettings } from '~/context/MainSettingsContext';
import { ProfilePhoto } from '~/types/main-settings.types';
import { callToast } from '~/utils/ui.utils';

const AddPhotoItem = () => {
  const [selectedImage, setSelectedImage] = useState<ProfilePhoto | null>(null);

  const { photos, setPhotos } = useMainSettings();
  const pickImageAsync = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      console.log('added images', result.assets[0].fileName);

      if (photos.find((photo) => photo.name === result.assets[0].fileName)) {
        callToast({
          type: 'error',
          text1: 'Image picking error!',
          text2: 'You already added this image.',
        });
      } else {
        setPhotos((prevPhotos) => [
          ...prevPhotos.filter((photo) => photo.name !== selectedImage?.name),
          {
            name: result.assets[0].fileName,
            base64: result.assets[0].base64,
          } as ProfilePhoto,
        ]);
        setSelectedImage({
          name: result.assets[0].fileName,
          base64: result.assets[0].base64,
        } as ProfilePhoto);
        console.log(
          'photos',
          photos.map((photo) => photo.name)
        );
      }
    } else {
      callToast({
        type: 'error',
        text1: 'Image picking error!',
        text2: 'You did not select any image.',
      });
    }
  };

  return (
    <TouchableOpacity
      onPress={pickImageAsync}
      className="h-[250px] w-auto flex-1 items-center justify-center rounded-3xl border-2 border-dashed border-gray-500">
      {selectedImage ? (
        <Image
          source={{ uri: 'data:image/jpeg;base64,' + selectedImage.base64 }}
          className="h-full w-full rounded-3xl"
        />
      ) : (
        <View
          style={{
            padding: 15,
            borderRadius: 50,
            backgroundColor: COLORS.mainPurple,
          }}>
          <AntDesign
            name="plus"
            size={20}
            color="white"
            style={{
              display: 'flex',
              overflow: 'hidden',
            }}
          />
        </View>
      )}
    </TouchableOpacity>
  );
};

export default AddPhotoItem;

const styles = StyleSheet.create({});
