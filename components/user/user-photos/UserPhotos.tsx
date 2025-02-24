import { StyleSheet, View } from 'react-native';
import { Text as PaperText } from 'react-native-paper';

import UserPhotosList from './UserPhotosList';

import { COLORS } from '~/constants/colors';
import { IUserPhoto } from '~/types/user.types';

const UserPhotos = ({ photos, width }: { photos: IUserPhoto[]; width: number }) => {
  return (
    <View>
      <PaperText variant="titleMedium" style={styles.subtitle}>
        {photos.length} photos
      </PaperText>

      <UserPhotosList photos={photos} width={width} />
    </View>
  );
};

export default UserPhotos;

const styles = StyleSheet.create({
  subtitle: { color: COLORS.text, fontWeight: '600' },
});
