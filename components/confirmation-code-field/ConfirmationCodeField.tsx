import React, { useMemo, useState } from 'react';
import { Animated, StyleSheet } from 'react-native';
import {
  CodeField,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

import ConfirmationCodeFieldCell from './ConfirmationCodeFieldCell';

import { CONFIRMATION_CODE_FIELD_STYLES } from '~/constants/colors';

const { Value } = Animated;

type ConfirmationCodeFieldProps = {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  cellCount: number;
};

const ConfirmationCodeField = ({ value, setValue, cellCount }: ConfirmationCodeFieldProps) => {
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
          key={cell.index}
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
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
});
