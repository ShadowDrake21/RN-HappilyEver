import MediumTitle from '@components/ui/MediumTitle';
import { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';

export const OverlayLabelRight = () => (
  <View
    style={[
      styles.overlayLabelContainer,
      {
        backgroundColor: 'green',
      },
    ]}>
    <MediumTitle>Suggest a Match</MediumTitle>
  </View>
);
export const OverlayLabelLeft = () => (
  <View
    style={[
      styles.overlayLabelContainer,
      {
        backgroundColor: 'red',
      },
    ]}>
    <MediumTitle>Looking for Someone Else</MediumTitle>
  </View>
);
export const OverlayLabelTop = () => (
  <View
    style={[
      styles.overlayLabelContainer,

      {
        backgroundColor: 'blue',
      },
    ]}>
    <MediumTitle>Explore Potential Match</MediumTitle>
  </View>
);

export const OverlayLabelBottom = () => (
  <View
    style={[
      styles.overlayLabelContainer,
      {
        backgroundColor: 'orange',
      },
    ]}>
    <MediumTitle>Make the First Move</MediumTitle>
  </View>
);

const styles = StyleSheet.create({
  overlayLabelContainer: {
    width: '100%',
    height: '100%',
    borderRadius: 25,
    justifyContent: 'center',
  },
});
