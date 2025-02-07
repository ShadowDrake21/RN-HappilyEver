import { FlatList, Image, Text, View } from 'react-native';
import { Text as PaperText } from 'react-native-paper';

import { COLORS } from '~/constants/colors';
import { IUserPhoto } from '~/types/user.types';

const UserPhotos = ({ photos, width }: { photos: IUserPhoto[]; width: number }) => {
  return (
    <View>
      <PaperText variant="titleMedium" style={{ color: COLORS.text, fontWeight: '600' }}>
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
            style={{ height: width + 200, width: width - 80, borderRadius: 40 }}
          />
        )}
      />
    </View>
  );
};

export default UserPhotos;
