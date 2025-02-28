import AddPhotoItem from '@components/add-photos/AddPhotoItem';
import ParagraphText from '@components/ui/ParagraphText';
import React from 'react';
import { FlatList, View } from 'react-native';

const AVAILABLE_PHOTOS = 4;

const AddPhotos = () => {
  return (
    <View>
      <ParagraphText>
        Upload photos that reflect your true self to connect with people who value serious
        relationships and family-oriented commitments.
      </ParagraphText>

      <FlatList
        data={Array.from({ length: AVAILABLE_PHOTOS })}
        renderItem={() => <AddPhotoItem />}
        keyExtractor={(_, index) => index.toString()}
        numColumns={2}
        contentContainerClassName="gap-4"
        columnWrapperClassName="gap-4"
        scrollEnabled={false}
      />
    </View>
  );
};

export default AddPhotos;
