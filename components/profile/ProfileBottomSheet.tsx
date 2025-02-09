import SecondaryButton from '@components/ui/SecondaryButton';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { COLORS } from '~/constants/colors';
import { useProfileImageSelectionContext } from '~/context/ProfileImageSelectionContext';

const ProfileBottomSheet = ({
  bottomSheetRef,
}: {
  bottomSheetRef: React.RefObject<BottomSheetMethods>;
}) => {
  const { bottom } = useSafeAreaInsets();
  const { onActionWithImage } = useProfileImageSelectionContext();
  const { setToggleBottomSheet } = useProfileImageSelectionContext();

  return (
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
          onPress={() => {
            onActionWithImage('camera');
            bottomSheetRef.current?.close();
          }}
          icon={({ size }) => (
            <MaterialIcons name="photo-camera" size={size} color={COLORS.text} />
          )}>
          Take a photo
        </SecondaryButton>
        <SecondaryButton
          style={{ backgroundColor: COLORS.accent2 }}
          onPress={() => {
            onActionWithImage('gallery');
            bottomSheetRef.current?.close();
          }}
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
  );
};

export default ProfileBottomSheet;

const styles = StyleSheet.create({
  photoSelectorContainer: { flex: 1, borderTopLeftRadius: 20, borderTopRightRadius: 20 },
});
