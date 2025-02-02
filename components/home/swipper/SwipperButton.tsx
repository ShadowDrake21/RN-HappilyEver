import { Icon } from '@expo/vector-icons/build/createIconSet';
import React, { ReactNode } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const SwipperButton = ({
  icon,
  onPress,
  type,
}: {
  icon: ReactNode;
  onPress: () => void;
  type: 'main' | 'secondary';
}) => {
  return (
    <TouchableOpacity
      className="rounded-full"
      style={[{ backgroundColor: '#09004c' }, type === 'main' ? { padding: 20 } : { padding: 15 }]}
      onPress={onPress}>
      {icon}
    </TouchableOpacity>
  );
};

export default SwipperButton;

const styles = StyleSheet.create({});
