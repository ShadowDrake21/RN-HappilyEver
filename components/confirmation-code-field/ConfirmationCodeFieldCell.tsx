import { Animated, LayoutChangeEvent, Platform, StyleSheet } from 'react-native';
import { Cursor } from 'react-native-confirmation-code-field';

import { CONFIRMATION_CODE_FIELD_STYLES } from '~/constants/colors';
import useConfirmationCodeCellAnimation from '~/hooks/confirmation-code/useConfirmationCodeCellAnimation';
import { animateCell } from '~/utils/confirmation-code-field.utils';
const { Text: AnimatedText } = Animated;

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
  const hasValue = Boolean(symbol);
  const { animatedCellStyle } = useConfirmationCodeCellAnimation({
    symbol,
    animationsScale,
    index,
    animationsColor,
  });

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
