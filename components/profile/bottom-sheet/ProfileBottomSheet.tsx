import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import React from 'react';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import ProfileBottomSheetActions from './ProfileBottomSheetActions';

import { COLORS } from '~/constants/colors';
import { useProfileImageSelectionContext } from '~/context/ProfileImageSelectionContext';

const ProfileBottomSheet = ({
  bottomSheetRef,
}: {
  bottomSheetRef: React.RefObject<BottomSheetMethods>;
}) => {
  const { bottom } = useSafeAreaInsets();
  const { setToggleBottomSheet } = useProfileImageSelectionContext();

  const onClosePress = () => {
    setToggleBottomSheet(false);
    bottomSheetRef.current?.close();
  };
  return (
    <BottomSheet
      ref={bottomSheetRef}
      onClose={onClosePress}
      snapPoints={['40%']}
      enablePanDownToClose
      backgroundStyle={styles.photoSelectorBackground}
      containerStyle={styles.photoSelectorContainer}
      handleIndicatorStyle={styles.photoSelectorHandle}
      index={-1}>
      <BottomSheetScrollView
        contentContainerStyle={{ paddingBottom: bottom, gap: 15 }}
        style={{ padding: 20 }}>
        <ProfileBottomSheetActions bottomSheetRef={bottomSheetRef} onClosePress={onClosePress} />
      </BottomSheetScrollView>
    </BottomSheet>
  );
};

export default ProfileBottomSheet;

const styles = StyleSheet.create({
  photoSelectorBackground: { backgroundColor: COLORS.dark, borderRadius: 25 },
  photoSelectorContainer: { flex: 1, borderTopLeftRadius: 20, borderTopRightRadius: 20 },
  photoSelectorHandle: { backgroundColor: COLORS.extremelyDark },
});
