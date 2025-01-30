import React from 'react';
import { Text as PaperText } from 'react-native-paper';

import { COLORS } from '~/constants/colors';
import { CustomTextProps } from '~/types/basic.types';

const SmallParagraphText = ({ children, style }: CustomTextProps) => {
  return (
    <PaperText variant="labelMedium" style={[{ color: COLORS.text }, style]}>
      {children}
    </PaperText>
  );
};

export default SmallParagraphText;
