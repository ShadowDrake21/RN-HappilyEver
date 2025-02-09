import PremiumBanner from '@components/profile/PremiumBanner';
import ProfileOptionsList from '@components/profile/ProfileOptionsList';
import ProfileSelectImage from '@components/profile/ProfileSelectImage';
import SecondaryButton from '@components/ui/SecondaryButton';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import React, { useRef, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { COLORS } from '~/constants/colors';
import usePickImageFromGallery from '~/hooks/usePickProfileImageFromGallery';
import useTakeProfileImageByCamera from '~/hooks/useTakeProfileImageByCamera';

const Page = () => {
  const { bottom } = useSafeAreaInsets();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [toggleBottomSheet, setToggleBottomSheet] = useState(false);

  const [selectedProfileImage, setSelectedProfileImage] = useState<string>('');
  const [buttonsVisibility, setButtonsVisibility] = useState(false);

  const { pickFromGalleryAsync } = usePickImageFromGallery();
  const { takeByCameraAsync } = useTakeProfileImageByCamera();

  const onPickFromGallery = async () => {
    const image = await pickFromGalleryAsync();
    setSelectedProfileImage(image);
    setButtonsVisibility(true);
    bottomSheetRef.current?.close();
  };

  const onTakeByCamera = async () => {
    const image = await takeByCameraAsync();
    setSelectedProfileImage(image);
    setButtonsVisibility(true);
    bottomSheetRef.current?.close();
  };

  const onProfileImagePress = () => {
    if (toggleBottomSheet) {
      setToggleBottomSheet(false);
      bottomSheetRef.current?.close();
    } else {
      setToggleBottomSheet(true);
      bottomSheetRef.current?.expand();
    }
  };

  const resetSelectedImage = () => {
    setSelectedProfileImage('');
    setButtonsVisibility(false);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ paddingHorizontal: 20, gap: 20 }}>
          <ProfileSelectImage
            onImagePress={onProfileImagePress}
            isSelection={buttonsVisibility}
            selectedImage={selectedProfileImage}
            reset={resetSelectedImage}
          />

          <PremiumBanner />
          <>
            <ProfileOptionsList />
            <View style={{ gap: 15 }}>
              <SecondaryButton
                style={{ backgroundColor: COLORS.error }}
                icon={({ size, color }) => (
                  <MaterialIcons name="delete" size={size} color={color} />
                )}
                onPress={() => {
                  console.log('Delete Account');
                }}>
                Delete Account
              </SecondaryButton>
              <SecondaryButton
                style={{ backgroundColor: COLORS.mainPurple }}
                icon={({ size, color }) => (
                  <MaterialIcons name="logout" size={size} color={color} />
                )}
                onPress={() => {
                  console.log('Logout');
                }}>
                Logout
              </SecondaryButton>
            </View>
          </>
        </View>
      </ScrollView>
      <BottomSheet
        ref={bottomSheetRef}
        onClose={() => {
          setToggleBottomSheet(false);
          bottomSheetRef.current?.close();
        }}
        snapPoints={['40%']}
        enablePanDownToClose
        backgroundStyle={{ backgroundColor: COLORS.dark, borderRadius: 25 }}
        containerStyle={styles.photoSelectorContainer}
        handleIndicatorStyle={{ backgroundColor: COLORS.extremelyDark }}
        index={-1}>
        <BottomSheetScrollView
          contentContainerStyle={{ paddingBottom: bottom, gap: 15 }}
          style={{ padding: 20 }}>
          <SecondaryButton
            style={{ backgroundColor: COLORS.slayish }}
            onPress={onTakeByCamera}
            icon={({ size }) => (
              <MaterialIcons name="photo-camera" size={size} color={COLORS.text} />
            )}>
            Take a photo
          </SecondaryButton>
          <SecondaryButton
            style={{ backgroundColor: COLORS.accent2 }}
            onPress={onPickFromGallery}
            icon={({ size }) => (
              <MaterialIcons name="photo-library" size={size} color={COLORS.text} />
            )}>
            Choose from gallery
          </SecondaryButton>

          <SecondaryButton
            style={{ backgroundColor: COLORS.error }}
            onPress={() => {
              setToggleBottomSheet(false);
              bottomSheetRef.current?.close();
            }}
            icon={({ size }) => <FontAwesome name="close" size={size} color={COLORS.text} />}>
            Cancel
          </SecondaryButton>
        </BottomSheetScrollView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

export default Page;

const styles = StyleSheet.create({
  photoSelectorContainer: { flex: 1, borderTopLeftRadius: 20, borderTopRightRadius: 20 },
});
