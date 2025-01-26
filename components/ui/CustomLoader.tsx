import React from 'react';
import { StyleSheet } from 'react-native';
import LoaderKit from 'react-native-loader-kit';

import { COLORS } from '~/constants/colors';

const CustomLoader = () => {
  return <LoaderKit style={styles.container} name="BallSpinFadeLoader" color={COLORS.accent2} />;
};

export default CustomLoader;

const styles = StyleSheet.create({
  container: { width: 50, height: 50, alignSelf: 'center', flex: 1 },
});
