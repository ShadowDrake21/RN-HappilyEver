import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from 'react-native-paper';
import Animated, { SharedValue } from 'react-native-reanimated';

import useBottomSheetAnimations from '~/hooks/bottom-sheet/useBottomSheetAnimations';

const BottomSheet = ({
  isOpen,
  onPress,
  duration = 500,
  children,
}: {
  isOpen: SharedValue<boolean>;
  onPress: any;
  duration?: number;
  children: any;
}) => {
  const { dark } = useTheme();
  const { backdropStyle, height, sheetStyle } = useBottomSheetAnimations(isOpen, duration);

  const backgroundColorSheetStyle = {
    backgroundColor: !dark ? '#f8f9ff' : '#272B3C',
  };

  return (
    <>
      <Animated.View style={[sheetStyles.backdrop, backdropStyle]}>
        <TouchableOpacity style={{ flex: 1 }} onPress={onPress} />
      </Animated.View>
      <Animated.View
        onLayout={(e) => {
          height.value = e.nativeEvent.layout.height;
        }}
        style={[sheetStyles.sheet, sheetStyle, backgroundColorSheetStyle]}>
        {children}
      </Animated.View>
    </>
  );
};

const sheetStyles = StyleSheet.create({
  sheet: {
    padding: 16,
    paddingRight: 32,
    paddingLeft: 32,
    height: 400,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    zIndex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.0)',
    zIndex: 99,
  },
});

export default BottomSheet;
