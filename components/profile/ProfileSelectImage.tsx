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

  const saveProfileImage = () => {
    return user?.setProfileImage({ file: selectedImage }).then(() => resetSelectedImage());
  };

  const onSave = async () => {
    setSelectionLoading(true);
    await saveProfileImage();
    setSelectionLoading(false);
  };

  return (
    <View style={{ position: 'relative', flex: 1 }}>
      <View style={{ flexDirection: 'row', gap: 15, alignSelf: 'center' }}>
        <View className="self-center">
          <Pressable onPress={onImagePress}>
            {selectedImage ? (
              <Image
                source={{ uri: selectedImage }}
                style={{ width: 200, height: 200, borderRadius: 100 }}
                resizeMode="cover"
              />
            ) : (
              <Image
                source={{ uri: user?.imageUrl }}
                style={{ width: 200, height: 200, borderRadius: 100 }}
                resizeMode="cover"
              />
            )}
          </Pressable>
        </View>
        {buttonsVisibility && (
          <View style={{ justifyContent: 'center' }}>
            <IconButton icon="check" iconColor="green" size={30} onPress={onSave} />
            <IconButton icon="close" iconColor="red" size={30} onPress={resetSelectedImage} />
          </View>
        )}
        {selectionLoading && (
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <LoaderKit
              name="BallPulseSync"
              style={{ width: 80, height: 80 }}
              color={COLORS.mainPurple}
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default ProfileSelectImage;

const styles = StyleSheet.create({});
