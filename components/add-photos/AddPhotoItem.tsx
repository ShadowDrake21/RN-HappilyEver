import AntDesign from '@expo/vector-icons/AntDesign';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

import { COLORS } from '~/constants/colors';
import usePickProfileImage from '~/hooks/image-picker/usePickProfileGeneralImage';

const AddPhotoItem = () => {
  const { pickImage, selectedImage } = usePickProfileImage();

  return (
    <TouchableOpacity
      onPress={pickImage}
      className="h-[250px] w-auto flex-1 items-center justify-center rounded-3xl border-2 border-dashed border-gray-500">
      {selectedImage ? (
        <Image
          source={{ uri: 'data:image/jpeg;base64,' + selectedImage.base64 }}
          className="h-full w-full rounded-3xl"
        />
      ) : (
        <View
          className="rounded-[50px] p-[15px]"
          style={{
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
