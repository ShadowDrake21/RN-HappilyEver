import { FlatList, Image } from 'react-native';

import { IUserPhoto } from '~/types/user.types';

const UserPhotosList = ({ photos, width }: { photos: IUserPhoto[]; width: number }) => {
  return (
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
  );
};

export default UserPhotosList;
