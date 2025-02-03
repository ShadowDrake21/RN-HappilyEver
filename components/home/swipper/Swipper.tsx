import React, { PropsWithRef, RefObject, useCallback, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Swiper, SwiperCardRefType } from 'rn-swiper-list';

import SwipperItem from './SwipperItem';

import { mock_users } from '~/content/users.content';

const Swipper = ({ carouselRef }: { carouselRef: PropsWithRef<RefObject<SwiperCardRefType>> }) => {
  const [data, setData] = useState([...mock_users]);

  const OverlayLabelRight = useCallback(() => {
    return (
      <View
        style={[
          styles.overlayLabelContainer,
          {
            backgroundColor: 'green',
          },
        ]}
      />
    );
  }, []);
  const OverlayLabelLeft = useCallback(() => {
    return (
      <View
        style={[
          styles.overlayLabelContainer,
          {
            backgroundColor: 'red',
          },
        ]}
      />
    );
  }, []);
  const OverlayLabelTop = useCallback(() => {
    return (
      <View
        style={[
          styles.overlayLabelContainer,
          {
            backgroundColor: 'blue',
          },
        ]}
      />
    );
  }, []);
  return (
    <Swiper
      ref={carouselRef}
      cardStyle={styles.cardStyle}
      data={data}
      renderCard={(item) => <SwipperItem item={item} />}
      onIndexChange={(index) => {
        console.log('Current Active index', index);
      }}
      onSwipeRight={(cardIndex) => {
        console.log('cardIndex', cardIndex);
      }}
      onSwipedAll={() => {
        console.log('onSwipedAll');
      }}
      onSwipeLeft={(cardIndex) => {
        console.log('onSwipeLeft', cardIndex);
      }}
      onSwipeTop={(cardIndex) => {
        console.log('onSwipeTop', cardIndex);
      }}
      OverlayLabelRight={OverlayLabelRight}
      OverlayLabelLeft={OverlayLabelLeft}
      OverlayLabelTop={OverlayLabelTop}
      onSwipeActive={() => {
        console.log('onSwipeActive');
      }}
      onSwipeStart={() => {
        console.log('onSwipeStart');
      }}
      onSwipeEnd={() => {
        console.log('onSwipeEnd');
      }}
    />
  );
};

export default Swipper;

const styles = StyleSheet.create({
  cardStyle: {
    width: '100%',
    height: '100%',

    borderRadius: 25,
  },

  overlayLabelContainer: {
    width: '100%',
    height: '100%',
    borderRadius: 25,
  },
});
