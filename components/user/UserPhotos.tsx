import { FlatList, Image, StyleSheet, View } from 'react-native';
import { Text as PaperText } from 'react-native-paper';

import { COLORS } from '~/constants/colors';
import { IUserPhoto } from '~/types/user.types';

const UserPhotos = ({ photos, width }: { photos: IUserPhoto[]; width: number }) => {
  return (
    <View>
      <PaperText variant="titleMedium" style={styles.subtitle}>
        {photos.length} photos
      </PaperText>

      <FlatList
        horizontal
        data={photos.map((photo) => photo.url)}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Image
            source={{ uri: item }}
            className="rounded-[40px]"
            style={{ height: width + 200, width: width - 80 }}
          />
        )}
      />
    </View>
  );
};

export default UserPhotos;

const styles = StyleSheet.create({
  subtitle: { color: COLORS.text, fontWeight: '600' },
});
