import SecondaryButton from '@components/ui/SecondaryButton';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { View } from 'react-native';

import { COLORS } from '~/constants/colors';

const FilterBottomSheetActions = ({
  bottomSheetRef,
}: {
  bottomSheetRef: React.RefObject<BottomSheetMethods>;
}) => {
  return (
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
  );
};

export default FilterBottomSheetActions;
