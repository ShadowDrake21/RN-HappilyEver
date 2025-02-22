import { Image, TouchableOpacity } from 'react-native';

import AddPhotoItemPlaceholder from './AddPhotoItemPlaceholder';

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
        <AddPhotoItemPlaceholder />
      )}
    </TouchableOpacity>
  );
};

export default AddPhotoItem;
