import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Chip } from 'react-native-paper';

const ActivityBadge = ({
  isUserActive,
  onPress,
}: {
  isUserActive: boolean;
  onPress?: () => void;
}) => {
  return (
    <Chip
      icon={() =>
        isUserActive ? <View style={styles.active} /> : <View style={styles.inactive} />
      }
      onPress={onPress}
      style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
      textStyle={{ color: 'white' }}>
      {isUserActive ? 'Active' : 'Inactive'}
    </Chip>
  );
};

export default ActivityBadge;

const styles = StyleSheet.create({
  active: {
    width: 10,
    height: 10,
    backgroundColor: 'green',
    borderRadius: 50,
  },
  inactive: {
    width: 10,
    height: 10,
    backgroundColor: 'red',
    borderRadius: 50,
  },
});
