import { BottomSheetBackdrop, BottomSheetBackdropProps } from '@gorhom/bottom-sheet';

export const renderBackdrop = (props: BottomSheetBackdropProps, onClose: () => void) => {
  return (
    <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} onPress={onClose} />
  );
};
