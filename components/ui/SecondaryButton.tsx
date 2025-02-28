import React, { PropsWithChildren } from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { Button, Text as PaperText } from 'react-native-paper';
import { IconSource } from 'react-native-paper/lib/typescript/components/Icon';

import { COLORS } from '~/constants/colors';

type SecondaryButtonProps = PropsWithChildren & {
  onPress: () => void;
  style: ViewStyle;
  icon?: IconSource;
};

const SecondaryButton = ({ children, onPress, style, icon }: SecondaryButtonProps) => {
  return (
    <Button
      mode="contained"
      style={[styles.container, style]}
      contentStyle={styles.content}
      icon={icon}
      onPress={onPress}>
      <PaperText variant="labelLarge" style={{ color: COLORS.text }}>
        {children}
      </PaperText>
    </Button>
  );
};

export default SecondaryButton;

const styles = StyleSheet.create({
  container: {
    borderRadius: 40,
    flex: 1,
    backgroundColor: COLORS.mainPurple,
  },
  content: { paddingVertical: 10 },
});
