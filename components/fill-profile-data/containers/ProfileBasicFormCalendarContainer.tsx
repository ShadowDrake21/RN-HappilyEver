import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import ProfileBasicFormCalendar from '../fields/ProfileBasicFormCalendar';

import { ProfileBasicFormField } from '~/types/main-settings.types';
import { renderBackdrop } from '~/utils/render.utils';

type ProfileBasicFormCalendarContainerProps = ProfileBasicFormField & {
  bottomSheetRef: React.RefObject<BottomSheetMethods>;
  collapseSheet: () => void;
};

const ProfileBasicFormCalendarContainer = (props: ProfileBasicFormCalendarContainerProps) => {
  const { control, errors, bottomSheetRef, collapseSheet } = props;
  const { bottom } = useSafeAreaInsets();

  return (
    <BottomSheet
      ref={bottomSheetRef}
      onClose={collapseSheet}
      snapPoints={['50%']}
      enablePanDownToClose
      backdropComponent={renderBackdrop}
      containerStyle={{ zIndex: 100, position: 'absolute', bottom: 0 }}
      index={-1}>
      <BottomSheetScrollView
        contentContainerStyle={{ paddingBottom: bottom, gap: 15 }}
        style={{ padding: 20 }}>
        <ProfileBasicFormCalendar control={control} errors={errors} />
      </BottomSheetScrollView>
    </BottomSheet>
  );
};

export default ProfileBasicFormCalendarContainer;
