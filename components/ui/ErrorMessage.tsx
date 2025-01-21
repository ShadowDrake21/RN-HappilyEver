import { PropsWithChildren } from 'react';
import { StyleSheet } from 'react-native';
import { Text as PaperText } from 'react-native-paper';

import { COLORS } from '~/constants/colors';

const ErrorMessage = ({ children }: PropsWithChildren) => {
  return (
    <PaperText variant="labelLarge" style={styles.text}>
      {children}
    </PaperText>
  );
};

export default ErrorMessage;

const styles = StyleSheet.create({
  text: { color: COLORS.error, paddingTop: 5 },
});
