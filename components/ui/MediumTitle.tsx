import React from 'react';
import { Text as PaperText } from 'react-native-paper';

import { defaultTitleStyles } from '~/constants/styles';
import { CustomTextProps } from '~/types/basic.types';

const MediumTitle = ({ children, style }: CustomTextProps) => {
  return (
    <PaperText variant="headlineMedium" style={[defaultTitleStyles, style]}>
      {children}
    </PaperText>
  );
};

export default MediumTitle;
