import React, { PropsWithChildren } from 'react';
import { StyleProp, TextStyle } from 'react-native';
import { Text as PaperText } from 'react-native-paper';

import { defaultTitleStyles } from '~/constants/styles';

type MediumTitleProps = PropsWithChildren & { style?: StyleProp<TextStyle> };

const MediumTitle = ({ children, style }: MediumTitleProps) => {
  return (
    <PaperText variant="headlineMedium" style={[defaultTitleStyles, style]}>
      {children}
    </PaperText>
  );
};

export default MediumTitle;
