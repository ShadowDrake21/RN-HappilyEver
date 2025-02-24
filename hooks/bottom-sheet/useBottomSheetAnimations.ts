import {
  SharedValue,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

const useBottomSheetAnimations = (isOpen: SharedValue<boolean>, duration: number) => {
  const height = useSharedValue(0);
  const progress = useDerivedValue(() => withTiming(isOpen.value ? 0 : 1, { duration }));

  const sheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: progress.value * 2 * height.value }],
  }));

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: 1 - progress.value,
    zIndex: isOpen.value ? 1 : withDelay(duration, withTiming(-1, { duration: 0 })),
  }));

  return { sheetStyle, backdropStyle, height };
};

export default useBottomSheetAnimations;
