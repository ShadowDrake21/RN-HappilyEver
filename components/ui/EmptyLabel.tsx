import React, { PropsWithChildren } from 'react';
import { StyleSheet } from 'react-native';
import { Text as PaperText } from 'react-native-paper';

import { COLORS } from '~/constants/colors';

const EmptyLabel = ({ children }: PropsWithChildren) => {
  return (
    <PaperText variant="labelLarge" style={styles.text}>
      {children}
    </PaperText>
  );
};

export default EmptyLabel;

const styles = StyleSheet.create({
  text: { color: COLORS.grayish, fontWeight: 700, textAlign: 'center' },
});
