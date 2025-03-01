import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import HeaderActions from './HeaderActions';
import HeaderContent from './HeaderContent';

const Header = ({
  bottomSheetCurrent,
  testID,
}: {
  bottomSheetCurrent: BottomSheetMethods | null;
  testID: string;
}) => {
  const { top } = useSafeAreaInsets();

  return (
    <View
      className="flex-row items-center justify-between p-4"
      style={{ paddingTop: top }}
      testID={testID}>
      <HeaderContent />
      <HeaderActions bottomSheetCurrent={bottomSheetCurrent} />
    </View>
  );
};

export default Header;
