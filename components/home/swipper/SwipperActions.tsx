import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import React, { PropsWithRef, RefObject } from 'react';
import { View } from 'react-native';
import { SwiperCardRefType } from 'rn-swiper-list';

import SwipperButton from './SwipperButton';

const SwipperActions = ({
  carouselRef,
}: {
  carouselRef: PropsWithRef<RefObject<SwiperCardRefType>>;
}) => {
  return (
    <View className="bottom-9  w-full flex-row items-end justify-center gap-5">
      <SwipperButton
        icon={<MaterialCommunityIcons name="shuffle-variant" size={24} color="grey" />}
        onPress={() => {
          console.log('shuffle');
        }}
        type="secondary"
      />
      <SwipperButton
        icon={<MaterialCommunityIcons name="cancel" size={28} color="red" />}
        onPress={() => carouselRef.current?.swipeLeft()}
        type="secondary"
      />
      <SwipperButton
        icon={<AntDesign name="heart" size={28} color="pink" />}
        onPress={() => carouselRef.current?.swipeRight()}
        type="secondary"
      />
      <SwipperButton
        icon={<AntDesign name="star" size={24} color="yellow" />}
        onPress={() => console.log('like')}
        type="secondary"
      />
    </View>
  );
};

export default SwipperActions;
