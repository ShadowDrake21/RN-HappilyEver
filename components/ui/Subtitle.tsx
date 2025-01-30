import React, { PropsWithChildren } from 'react';
import { TextStyle } from 'react-native';
import { Text as PaperText } from 'react-native-paper';

import { defaultTitleStyles } from '~/constants/styles';

type SubtitleProps = PropsWithChildren & { style?: TextStyle };

const Subtitle = ({ children, style }: SubtitleProps) => {
  return (
    <PaperText variant="titleMedium" style={[defaultTitleStyles, style]}>
      {children}
    </PaperText>
  );
};

export default Subtitle;
