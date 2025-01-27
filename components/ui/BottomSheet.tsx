import React, { useEffect } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from 'react-native-paper';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useDerivedValue,
  withDelay,
  withTiming,
  SharedValue,
} from 'react-native-reanimated';

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
  const height = useSharedValue(0);
  const progress = useDerivedValue(() => withTiming(isOpen.value ? 0 : 1, { duration }));

  const sheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: progress.value * 2 * height.value }],
  }));

  const backgroundColorSheetStyle = {
    backgroundColor: !dark ? '#f8f9ff' : '#272B3C',
  };

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: 1 - progress.value,
    zIndex: isOpen.value ? 1 : withDelay(duration, withTiming(-1, { duration: 0 })),
  }));

  useEffect(() => {
    console.log('isOpen', isOpen.value);
  }, [isOpen]);

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
