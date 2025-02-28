import React from 'react';
import { View } from 'react-native';
import { IconButton } from 'react-native-paper';

type ProfileSelectImageActionsProps = {
  saveProfileImage: () => Promise<void>;
  resetSelectedImage: () => void;
};

const ProfileSelectImageActions = ({
  saveProfileImage,
  resetSelectedImage,
}: ProfileSelectImageActionsProps) => {
  return (
    <View style={{ justifyContent: 'center' }}>
      <IconButton icon="check" iconColor="green" size={30} onPress={saveProfileImage} />
      <IconButton icon="close" iconColor="red" size={30} onPress={resetSelectedImage} />
    </View>
  );
};

export default ProfileSelectImageActions;
