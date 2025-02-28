import { Animated } from 'react-native';

import { CONFIRMATION_CODE_FIELD_STYLES } from '~/constants/colors';

const useConfirmationCodeCellAnimation = ({
  symbol,
  animationsScale,
  index,
  animationsColor,
}: {
  symbol: string;
  animationsScale: Animated.Value[];
  index: number;
  animationsColor: Animated.Value[];
}) => {
  const { cellSize, activeCellBgColor, defaultCellBgColor, cellBorderRadius, notEmptyCellBgColor } =
    CONFIRMATION_CODE_FIELD_STYLES;
  const hasValue = Boolean(symbol);

  const animatedCellStyle = {
    backgroundColor: hasValue
      ? animationsScale[index].interpolate({
          inputRange: [0, 1],
          outputRange: [notEmptyCellBgColor, activeCellBgColor],
        })
      : animationsColor[index].interpolate({
          inputRange: [0, 1],
          outputRange: [defaultCellBgColor, activeCellBgColor],
        }),
    borderRadius: animationsScale[index].interpolate({
      inputRange: [0, 1],
      outputRange: [cellSize, cellBorderRadius],
    }),
    transform: [
      {
        scale: animationsScale[index].interpolate({
          inputRange: [0, 1],
          outputRange: [0.2, 1],
        }),
      },
    ],
  };

  return { animatedCellStyle };
};

export default useConfirmationCodeCellAnimation;
