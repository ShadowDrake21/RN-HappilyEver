import { useUser } from '@clerk/clerk-expo';
import React, { useState } from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import LoaderKit from 'react-native-loader-kit';
import { IconButton } from 'react-native-paper';

import { COLORS } from '~/constants/colors';
import { useProfileImageSelectionContext } from '~/context/ProfileImageSelectionContext';

const ProfileSelectImage = ({ onImagePress }: { onImagePress: () => void }) => {
  const { user } = useUser();
  const [selectionLoading, setSelectionLoading] = useState(false);

  const { buttonsVisibility, selectedImage, resetSelectedImage } =
    useProfileImageSelectionContext();

  const saveProfileImage = async () => {
    setSelectionLoading(true);
    await user?.setProfileImage({ file: selectedImage });
    resetSelectedImage();
    setSelectionLoading(false);
  };

  return (
    <View className="relative flex-1">
      <View className="flex-row gap-[15px] self-center">
        <View className="self-center">
          <Pressable onPress={onImagePress}>
            {selectedImage ? (
              <Image
                source={{ uri: selectedImage }}
                className="h-[200px] w-[200px] rounded-[100px]"
                resizeMode="cover"
              />
            ) : (
              <Image
                source={{ uri: user?.imageUrl }}
                className="h-[200px] w-[200px] rounded-[100px]"
                resizeMode="cover"
              />
            )}
          </Pressable>
        </View>
        {buttonsVisibility && (
          <View style={{ justifyContent: 'center' }}>
            <IconButton icon="check" iconColor="green" size={30} onPress={saveProfileImage} />
            <IconButton icon="close" iconColor="red" size={30} onPress={resetSelectedImage} />
          </View>
        )}
        {selectionLoading && (
          <View className="absolute bottom-0 left-0 right-0 top-0 items-center justify-center">
            <LoaderKit name="BallPulseSync" style={styles.loader} color={COLORS.mainPurple} />
          </View>
        )}
      </View>
    </View>
  );
};

export default ProfileSelectImage;

const styles = StyleSheet.create({
  loader: { width: 80, height: 80 },
});
