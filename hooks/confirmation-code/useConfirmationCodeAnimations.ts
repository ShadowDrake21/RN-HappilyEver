import { useMemo } from 'react';
import { Animated } from 'react-native';
const { Value } = Animated;

const useConfirmationCodeAnimations = (cellCount: number) => {
  const animationsColor = useMemo(
    () => [...new Array(cellCount)].map(() => new Value(0)),
    [cellCount]
  );
  const animationsScale = useMemo(
    () => [...new Array(cellCount)].map(() => new Value(1)),
    [cellCount]
  );

  return { animationsColor, animationsScale };
};

export default useConfirmationCodeAnimations;
