import React from 'react';
import { Text as PaperText } from 'react-native-paper';

import { COLORS } from '~/constants/colors';
import { CustomTextProps } from '~/types/basic.types';

const ParagraphText = ({ children, style = { paddingBottom: 20 } }: CustomTextProps) => {
  return (
    <PaperText variant="labelLarge" style={[{ color: COLORS.text }, style]}>
      {children}
    </PaperText>
  );
};

export default ParagraphText;
