import BottomSheet from '@gorhom/bottom-sheet';
import React, { PropsWithChildren, useRef } from 'react';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { COLORS } from '~/constants/colors';

const UserBottomSheetContainer = ({ children }: PropsWithChildren) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const { top } = useSafeAreaInsets();

  return (
    <GestureHandlerRootView style={{ flex: 1, zIndex: 20, position: 'relative' }}>
      <BottomSheet
        ref={bottomSheetRef}
        onClose={() => bottomSheetRef.current?.close()}
        snapPoints={['20%', '80%']}
        backgroundStyle={{ backgroundColor: COLORS.extraDark, borderRadius: 25 }}
        containerStyle={[styles.container, { marginTop: top }]}
        index={0}>
        {children}
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

export default UserBottomSheetContainer;

const styles = StyleSheet.create({
  container: { flex: 1, borderTopLeftRadius: 20, borderTopRightRadius: 20 },
});
