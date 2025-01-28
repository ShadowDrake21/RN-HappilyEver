import { Animated, LayoutChangeEvent, Platform, StyleSheet } from 'react-native';
import { Cursor } from 'react-native-confirmation-code-field';

import { CONFIRMATION_CODE_FIELD_STYLES } from '~/constants/colors';
import { animateCell } from '~/utils/confirmation-code-field.utils';
const { Value, Text: AnimatedText } = Animated;

type ConfirmationCodeFieldCellProps = {
  index: number;
  symbol: string;
  isFocused: boolean;
  animationsColor: Animated.Value[];
  animationsScale: Animated.Value[];
  getCellOnLayoutHandler: (index: number) => (event: LayoutChangeEvent) => void;
};

const ConfirmationCodeFieldCell = ({
  index,
  symbol,
  isFocused,
  animationsColor,
  animationsScale,
  getCellOnLayoutHandler,
}: ConfirmationCodeFieldCellProps) => {
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

  setTimeout(() => {
    animateCell({ hasValue, index, isFocused, animationsColor, animationsScale });
  }, 0);

  return (
    <AnimatedText
      key={index}
      style={[styles.cell, animatedCellStyle]}
      onLayout={getCellOnLayoutHandler(index)}>
      {symbol || (isFocused ? <Cursor /> : null)}
    </AnimatedText>
  );
};

export default ConfirmationCodeFieldCell;

const styles = StyleSheet.create({
  cell: {
    marginHorizontal: 8,
    height: CONFIRMATION_CODE_FIELD_STYLES.cellSize,
    width: CONFIRMATION_CODE_FIELD_STYLES.cellSize,
    lineHeight: CONFIRMATION_CODE_FIELD_STYLES.cellSize - 5,
    ...Platform.select({ web: { lineHeight: 65 } }),
    fontSize: 30,
    textAlign: 'center',
    borderRadius: CONFIRMATION_CODE_FIELD_STYLES.cellBorderRadius,
    color: CONFIRMATION_CODE_FIELD_STYLES.textColor,
    backgroundColor: '#fff',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
});
