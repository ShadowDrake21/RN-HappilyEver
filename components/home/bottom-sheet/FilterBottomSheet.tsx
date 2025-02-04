import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import React, { useCallback, useState } from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import { Button, Text as PaperText } from 'react-native-paper';

import FilterBottomSheetLocation from './FilterBottomSheetLocation';
import CustomLabel from './SliderLabel';

import { COLORS } from '~/constants/colors';
import { defaultTitleStyles } from '~/constants/styles';

const FilterBottomSheet = ({
  bottomSheetRef,
}: {
  bottomSheetRef: React.RefObject<BottomSheetMethods>;
}) => {
  const [selectedGender, setSelectedGender] = useState<'male' | 'female'>('male');
  const [multiSliderValue, setMultiSliderValue] = useState([18, 25]);
  const { width } = useWindowDimensions();

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />
    ),
    []
  );

  const multiSliderValuesChange = (values: number[]) => setMultiSliderValue(values);
  return (
    <BottomSheet
      ref={bottomSheetRef}
      backdropComponent={renderBackdrop}
      snapPoints={['60%']}
      backgroundStyle={{ backgroundColor: COLORS.extraDark }}
      containerStyle={{ borderTopLeftRadius: 20, borderTopRightRadius: 20 }}
      index={-1}>
      <BottomSheetView style={styles.contentContainer}>
        <PaperText
          variant="headlineMedium"
          style={[defaultTitleStyles, { paddingBottom: 20, textAlign: 'center' }]}>
          Filter
        </PaperText>
        <View className="gap-5">
          <View>
            <PaperText
              variant="titleLarge"
              style={[
                defaultTitleStyles,
                { paddingBottom: 20, fontWeight: '400', textAlign: 'left' },
              ]}>
              Gender
            </PaperText>
            <View className="flex-row justify-center gap-2">
              <Button
                mode="contained"
                style={{
                  width: '50%',
                  borderRadius: 40,
                  borderWidth: 1,
                  borderColor:
                    selectedGender === 'male' ? COLORS.secondaryPurple : COLORS.mainPurple,
                }}
                contentStyle={[
                  {
                    paddingVertical: 5,
                    paddingHorizontal: 15,

                    backgroundColor:
                      selectedGender === 'male' ? COLORS.mainPurple : COLORS.secondaryPurple,
                  },
                ]}
                textColor={selectedGender === 'male' ? COLORS.text : COLORS.mainPurple}
                onPress={() => setSelectedGender('male')}>
                Male
              </Button>
              <Button
                mode="contained"
                style={{
                  width: '50%',
                  borderRadius: 40,
                  borderWidth: 1,
                  borderColor:
                    selectedGender === 'female' ? COLORS.secondaryPurple : COLORS.mainPurple,
                }}
                contentStyle={[
                  {
                    paddingVertical: 5,
                    paddingHorizontal: 15,

                    backgroundColor:
                      selectedGender === 'female' ? COLORS.mainPurple : COLORS.secondaryPurple,
                  },
                ]}
                textColor={selectedGender === 'female' ? COLORS.text : COLORS.mainPurple}
                onPress={() => setSelectedGender('female')}>
                Female
              </Button>
            </View>
          </View>
          <View>
            <PaperText
              variant="titleLarge"
              style={[
                defaultTitleStyles,
                { paddingBottom: 20, fontWeight: '400', textAlign: 'left' },
              ]}>
              Age
            </PaperText>
            <MultiSlider
              values={[multiSliderValue[0], multiSliderValue[1]]}
              containerStyle={{ width: '100%' }}
              trackStyle={{ width: '100%' }}
              onValuesChange={multiSliderValuesChange}
              selectedStyle={{ backgroundColor: COLORS.mainPurple }}
              sliderLength={width - 40}
              min={18}
              max={100}
              step={1}
              allowOverlap
              snapped
              markerStyle={{ height: 20, width: 20 }}
              enableLabel
              customLabel={(props) => CustomLabel(props)}
            />
          </View>
          <FilterBottomSheetLocation />
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
};

export default FilterBottomSheet;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 20,
  },
});
