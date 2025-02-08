import { useUser } from '@clerk/clerk-expo';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import React, { useEffect, useState } from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import LoaderKit from 'react-native-loader-kit';
import { IconButton } from 'react-native-paper';

import { COLORS } from '~/constants/colors';
import useSelectProfileImage from '~/hooks/useSelectProfileImage';

type ProfileSelectImageProps = {
  bottomSheetRef: React.RefObject<BottomSheetMethods>;
  toggleBottomSheet: boolean;
  setToggleBottomSheet: React.Dispatch<React.SetStateAction<boolean>>;
  selectedProfileImage: string;
  setSelectedProfileImage: React.Dispatch<React.SetStateAction<string>>;
};

const ProfileSelectImage = ({
  bottomSheetRef,
  toggleBottomSheet,
  setToggleBottomSheet,
  selectedProfileImage,
  setSelectedProfileImage,
}: ProfileSelectImageProps) => {
  const { user } = useUser();
  const [selectionLoading, setSelectionLoading] = useState(false);

  const { buttonsVisibitity, saveProfileImage, resetSelectedImage } = useSelectProfileImage({
    selectedProfileImage,
    setSelectedProfileImage,
  });

  useEffect(() => {
    console.log('selectedProfileImage', selectedProfileImage);
  }, [selectedProfileImage]);

  return (
    <View style={{ position: 'relative', flex: 1 }}>
      <View style={{ flexDirection: 'row', gap: 15, alignSelf: 'center' }}>
        <View className="self-center">
          <Pressable
            onPress={() => {
              if (toggleBottomSheet) {
                setToggleBottomSheet(false);
                bottomSheetRef.current?.close();
              } else {
                setToggleBottomSheet(true);
                bottomSheetRef.current?.expand();
              }
            }}>
            {selectedProfileImage ? (
              <Image
                source={{ uri: selectedProfileImage }}
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
        {buttonsVisibitity && (
          <View style={{ justifyContent: 'center' }}>
            <IconButton
              icon="check"
              iconColor="green"
              size={30}
              onPress={() => {
                setSelectionLoading(true);
                saveProfileImage();
                setSelectionLoading(false);
              }}
            />
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
