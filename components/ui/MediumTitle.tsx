import React, { PropsWithChildren } from 'react';
import { Text as PaperText } from 'react-native-paper';

import { defaultTitleStyles } from '~/constants/styles';

const MediumTitle = ({ children }: PropsWithChildren) => {
  return (
    <PaperText variant="headlineMedium" style={defaultTitleStyles}>
      {children}
    </PaperText>
  );
};

export default MediumTitle;
