import React, { ReactNode } from 'react';
import { TouchableOpacity } from 'react-native';

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
      style={[{ backgroundColor: '#09004c' }, type === 'main' ? { padding: 30 } : { padding: 20 }]}
      onPress={onPress}>
      {icon}
    </TouchableOpacity>
  );
};

export default SwipperButton;
