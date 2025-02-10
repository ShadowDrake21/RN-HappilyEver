import SecondaryButton from '@components/ui/SecondaryButton';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import React from 'react';

import { COLORS } from '~/constants/colors';
import { useProfileImageSelectionContext } from '~/context/ProfileImageSelectionContext';

const ProfileBottomSheetActions = ({
  bottomSheetRef,
  onClosePress,
}: {
  bottomSheetRef: React.RefObject<BottomSheetMethods>;
  onClosePress: () => void;
}) => {
  const { onActionWithImage } = useProfileImageSelectionContext();

  const onCameraPress = () => {
    onActionWithImage('camera');
    bottomSheetRef.current?.close();
  };

  const onGalleryPress = () => {
    onActionWithImage('gallery');
    bottomSheetRef.current?.close();
  };

  return (
    <>
      <SecondaryButton
        style={{ backgroundColor: COLORS.slayish }}
        onPress={onCameraPress}
        icon={({ size }) => <MaterialIcons name="photo-camera" size={size} color={COLORS.text} />}>
        Take a photo
      </SecondaryButton>
      <SecondaryButton
        style={{ backgroundColor: COLORS.accent2 }}
        onPress={onGalleryPress}
        icon={({ size }) => <MaterialIcons name="photo-library" size={size} color={COLORS.text} />}>
        Choose from gallery
      </SecondaryButton>
      <SecondaryButton
        style={{ backgroundColor: COLORS.error }}
        onPress={onClosePress}
        icon={({ size }) => <FontAwesome name="close" size={size} color={COLORS.text} />}>
        Cancel
      </SecondaryButton>
    </>
  );
};

export default ProfileBottomSheetActions;
