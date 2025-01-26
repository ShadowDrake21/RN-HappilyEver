import React, { PropsWithChildren } from 'react';
import { StyleSheet, Text, View } from 'react-native';
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

const styles = StyleSheet.create({});
