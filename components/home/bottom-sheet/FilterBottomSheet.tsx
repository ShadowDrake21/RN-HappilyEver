import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import React from 'react';
import { StyleSheet } from 'react-native';

import FilterBottomSheetActions from './FilterBottomSheetActions';
import FilterBottomSheetContainer from './FilterBottomSheetContainer';

import { COLORS } from '~/constants/colors';
import { renderBackdrop } from '~/utils/render.utils';

const FilterBottomSheet = ({
  bottomSheetRef,
}: {
  bottomSheetRef: React.RefObject<BottomSheetMethods>;
}) => {
  const collapseSheet = () => {
    bottomSheetRef.current?.close();
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      backdropComponent={(props) => renderBackdrop(props, collapseSheet)}
      enablePanDownToClose
      onClose={() => bottomSheetRef.current?.close()}
      snapPoints={['65%']}
      backgroundStyle={{ backgroundColor: COLORS.extraDark }}
      containerStyle={styles.container}
      index={-1}>
      <BottomSheetView style={styles.contentContainer}>
        <FilterBottomSheetContainer />
        <FilterBottomSheetActions bottomSheetRef={bottomSheetRef} />
      </BottomSheetView>
    </BottomSheet>
  );
};

export default FilterBottomSheet;

const styles = StyleSheet.create({
  container: { borderTopLeftRadius: 20, borderTopRightRadius: 20, flex: 1 },
  contentContainer: {
    flex: 1,
    padding: 20,
  },
});
