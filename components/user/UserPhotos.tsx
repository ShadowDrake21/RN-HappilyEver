import { FlatList, Image, Text, View } from 'react-native';

import { IUserPhoto } from '~/types/user.types';

const UserPhotos = ({ photos, width }: { photos: IUserPhoto[]; width: number }) => {
  return (
    <View>
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
      <View>
        <Text>{photos.length} photos</Text>
      </View>
    </View>
  );
};

export default UserPhotos;
