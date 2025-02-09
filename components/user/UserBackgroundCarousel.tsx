import React from 'react';
import { Image, StyleSheet, useWindowDimensions, View } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import Carousel from 'react-native-reanimated-carousel';

import { IUserPhoto } from '~/types/user.types';

const UserBackgroundCarousel = ({ photos }: { photos: IUserPhoto[] }) => {
  const { width, height } = useWindowDimensions();
  const scrollOffsetValue = useSharedValue<number>(0);

  return (
    <View style={StyleSheet.absoluteFillObject}>
      <Carousel
        loop
        width={width}
        height={height}
        snapEnabled
        pagingEnabled
        autoPlay
        autoPlayInterval={4000}
        data={photos || []}
        defaultScrollOffsetValue={scrollOffsetValue}
        renderItem={({ item, index }) => (
          <Image source={{ uri: item.url }} className="h-full w-full" key={index} />
        )}
      />
    </View>
  );
};

export default UserBackgroundCarousel;
