import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';

const usePickImageFromGallery = () => {
  const pickImageAsync = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      return 'data:image/jpeg;base64,' + result.assets[0].base64 || '';
    } else {
      Alert.alert('You did not select any image.');
      throw new Error('You did not select any image.');
    }
  };

  return {
    pickFromGalleryAsync: pickImageAsync,
  };
};

export default usePickImageFromGallery;
