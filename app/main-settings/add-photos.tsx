import AddPhotoItem from '@components/add-photos/AddPhotoItem';
import MainButtonLink from '@components/ui/MainButtonLink';
import React from 'react';
import { FlatList, View } from 'react-native';
import { Text as PaperText } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { COLORS } from '~/constants/colors';
import useRequestGalleryPermissions from '~/hooks/useRequestGalleryPermissions';

const AVAILABLE_PHOTOS = 4;

const Page = () => {
  const { bottom } = useSafeAreaInsets();
  useRequestGalleryPermissions();

  return (
    <View className="flex-1 justify-between" style={{ paddingBottom: bottom }}>
      <View>
        <PaperText variant="labelLarge" style={{ color: COLORS.text, paddingBottom: 20 }}>
          Upload photos that reflect your true self to connect with people who value serious
          relationships and family-oriented commitments.
        </PaperText>
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
      <MainButtonLink href="./select-interests">Continue</MainButtonLink>
    </View>
  );
};

export default Page;
