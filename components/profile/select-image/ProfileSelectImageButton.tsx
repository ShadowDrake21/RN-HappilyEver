import React from 'react';
import { Image, Pressable } from 'react-native';

type ProfileSelectImageButtonProps = {
  selectedImage: string;
  onImagePress: () => void;
  imageUrl: string | undefined;
};

const ProfileSelectImageButton = ({
  selectedImage,
  onImagePress,
  imageUrl,
}: ProfileSelectImageButtonProps) => {
  return (
    <Pressable onPress={onImagePress}>
      {selectedImage ? (
        <Image
          source={{ uri: selectedImage }}
          className="h-[200px] w-[200px] rounded-[100px]"
          resizeMode="cover"
        />
      ) : (
        <Image
          source={{ uri: imageUrl }}
          className="h-[200px] w-[200px] rounded-[100px]"
          resizeMode="cover"
        />
      )}
    </Pressable>
  );
};

export default ProfileSelectImageButton;
