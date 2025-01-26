import React, { PropsWithChildren } from 'react';
import { StyleProp, StyleSheet, TextStyle } from 'react-native';
import { Text as PaperText } from 'react-native-paper';

import { COLORS } from '~/constants/colors';

const SmallDisplayTitle = ({
  children,
  addStyle,
}: PropsWithChildren & { addStyle?: StyleProp<TextStyle> }) => (
  <PaperText variant="displaySmall" style={[styles.title, addStyle]}>
    {children}
  </PaperText>
);

export default SmallDisplayTitle;

const styles = StyleSheet.create({
  title: {
    color: COLORS.text,
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
    fontWeight: '600',
  },
});
