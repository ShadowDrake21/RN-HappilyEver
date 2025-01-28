import { Animated } from 'react-native';

export const animateCell = ({
  hasValue,
  index,
  isFocused,
  animationsColor,
  animationsScale,
}: {
  hasValue: boolean;
  index: number;
  isFocused: boolean;
  animationsColor: Animated.Value[];
  animationsScale: Animated.Value[];
}) => {
  Animated.parallel([
    Animated.timing(animationsColor[index], {
      useNativeDriver: false,
      toValue: isFocused ? 1 : 0,
      duration: 250,
    }),
    Animated.spring(animationsScale[index], {
      useNativeDriver: false,
      toValue: hasValue ? 0 : 1,
    }),
  ]).start();
};
