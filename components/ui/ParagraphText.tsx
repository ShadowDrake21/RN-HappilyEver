import React, { PropsWithChildren } from 'react';
import { TextStyle } from 'react-native';
import { Text as PaperText } from 'react-native-paper';

import { COLORS } from '~/constants/colors';

const ParagraphText = ({
  children,
  style = { paddingBottom: 20 },
}: PropsWithChildren & { style?: TextStyle }) => {
  return (
    <PaperText variant="labelLarge" style={[{ color: COLORS.text }, style]}>
      {children}
    </PaperText>
  );
};

export default ParagraphText;
