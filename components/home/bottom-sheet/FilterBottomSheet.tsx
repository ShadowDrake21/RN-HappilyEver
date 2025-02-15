import SecondaryButton from '@components/ui/SecondaryButton';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import React, { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text as PaperText } from 'react-native-paper';

import FilterBottomSheetAge from './FilterBottomSheetAge';
import FilterBottomSheetLocation from './FilterBottomSheetLocation';
import FilterBottomSheetGender from './gender/FilterBottomSheetGender';

import { COLORS } from '~/constants/colors';
import { defaultTitleStyles } from '~/constants/styles';
import { Gender } from '~/types/shared.types';

const FilterBottomSheet = ({
  bottomSheetRef,
}: {
  bottomSheetRef: React.RefObject<BottomSheetMethods>;
}) => {
  const [selectedGender, setSelectedGender] = useState<Gender>('male');
  const [selectedAgeRange, setSelectedAgeRange] = useState([18, 25]);
  const [selectedLocation, setSelectedLocation] = useState('');

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        onPress={() => bottomSheetRef.current?.close()}
      />
    ),
    []
  );

  return (
    <BottomSheet
      ref={bottomSheetRef}
      backdropComponent={renderBackdrop}
      enablePanDownToClose
      onClose={() => bottomSheetRef.current?.close()}
      snapPoints={['65%']}
      backgroundStyle={{ backgroundColor: COLORS.extraDark }}
      containerStyle={styles.container}
      index={-1}>
      <BottomSheetView style={styles.contentContainer}>
        <View>
          <PaperText
            variant="headlineMedium"
            style={[defaultTitleStyles, { paddingBottom: 20, textAlign: 'center' }]}>
            Filter
          </PaperText>
          <View className="gap-5 pb-10">
            <FilterBottomSheetGender
              selectedGender={selectedGender}
              setSelectedGender={setSelectedGender}
            />
            <FilterBottomSheetAge
              selectedAgeRange={selectedAgeRange}
              setSelectedAgeRange={setSelectedAgeRange}
            />
            <FilterBottomSheetLocation
              selectedLocation={selectedLocation}
              setSelectedLocation={setSelectedLocation}
            />
          </View>
        </View>
        <View className="flex-row justify-center gap-5">
          <SecondaryButton
            style={{ backgroundColor: COLORS.dark }}
            onPress={() => bottomSheetRef.current?.close()}>
            Cancel
          </SecondaryButton>
          <SecondaryButton
            style={{ backgroundColor: COLORS.mainPurple }}
            onPress={() => bottomSheetRef.current?.close()}>
            Apply
          </SecondaryButton>
        </View>
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
