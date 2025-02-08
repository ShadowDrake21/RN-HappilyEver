import React from 'react';
import { Image, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
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
        style={{ width: '100%', height: '100%' }}
        renderItem={({ item, index }) => (
          <Image source={{ uri: item.url }} style={{ width: '100%', height: '100%' }} key={index} />
        )}
      />
    </View>
  );
};

export default UserBackgroundCarousel;

const styles = StyleSheet.create({});
