import React, { PropsWithChildren } from 'react';
import { StyleSheet } from 'react-native';
import { Text as PaperText } from 'react-native-paper';

import { defaultTitleStyles } from '~/constants/styles';

const FilterSectionTitle = ({ children }: PropsWithChildren) => {
  return (
    <PaperText variant="titleLarge" style={[defaultTitleStyles, styles.title]}>
      {children}
    </PaperText>
  );
};

export default FilterSectionTitle;

const styles = StyleSheet.create({
  title: { paddingBottom: 20, fontWeight: '400', textAlign: 'left' },
});
