import SecondaryButton from '@components/ui/SecondaryButton';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from 'react';
import { View } from 'react-native';

import { COLORS } from '~/constants/colors';

const ProfileAccountActions = ({
  onDelete,
  onSignOut,
}: {
  onDelete: () => void;
  onSignOut: () => void;
}) => {
  return (
    <View style={{ gap: 15 }}>
      <SecondaryButton
        style={{ backgroundColor: COLORS.error }}
        icon={({ size, color }) => <MaterialIcons name="delete" size={size} color={color} />}
        onPress={onDelete}>
        Delete Account
      </SecondaryButton>
      <SecondaryButton
        style={{ backgroundColor: COLORS.mainPurple }}
        icon={({ size, color }) => <MaterialIcons name="logout" size={size} color={color} />}
        onPress={onSignOut}>
        Logout
      </SecondaryButton>
    </View>
  );
};

export default ProfileAccountActions;
