import React, { useMemo, useState } from 'react';
import { Animated, StyleSheet } from 'react-native';
import {
  CodeField,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

import ConfirmationCodeFieldCell from './confirmation-code-field/ConfirmationCodeFieldCell';

import { CONFIRMATION_CODE_FIELD_STYLES } from '~/constants/colors';

const { Value } = Animated;

const ConfirmationCodeField = ({ cellCount }: { cellCount: number }) => {
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const animationsColor = useMemo(
    () => [...new Array(cellCount)].map(() => new Value(0)),
    [cellCount]
  );
  const animationsScale = useMemo(
    () => [...new Array(cellCount)].map(() => new Value(1)),
    [cellCount]
  );

  return (
    <CodeField
      ref={ref}
      {...props}
      value={value}
      onChangeText={setValue}
      cellCount={cellCount}
      rootStyle={styles.codeFieldRoot}
      keyboardType="number-pad"
      textContentType="oneTimeCode"
      renderCell={(cell) => (
        <ConfirmationCodeFieldCell
          {...cell}
          animationsColor={animationsColor}
          animationsScale={animationsScale}
          getCellOnLayoutHandler={getCellOnLayoutHandler}
        />
      )}
    />
  );
};

export default ConfirmationCodeField;

const styles = StyleSheet.create({
  codeFieldRoot: {
    height: CONFIRMATION_CODE_FIELD_STYLES.cellSize,
    marginTop: 30,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
});
