import React from 'react';
import { Text as PaperText } from 'react-native-paper';

import { defaultTitleStyles } from '~/constants/styles';
import { CustomTextProps } from '~/types/basic.types';

const SmallSectionTitle = ({ children, style }: CustomTextProps) => {
  return (
    <PaperText variant="headlineSmall" style={[defaultTitleStyles, style]}>
      {children}
    </PaperText>
  );
};

export default SmallSectionTitle;
