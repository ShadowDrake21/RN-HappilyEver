import MediumTitle from '@components/ui/MediumTitle';
import { useRouter } from 'expo-router';
import React, { PropsWithRef, RefObject, useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Swiper, SwiperCardRefType } from 'rn-swiper-list';

import SwipperItem from './SwipperItem';

import { mock_users } from '~/content/users.content';
import { useMatchesModalContext } from '~/context/MatchesModalContext';

const Swipper = ({ carouselRef }: { carouselRef: PropsWithRef<RefObject<SwiperCardRefType>> }) => {
  const router = useRouter();
  const [data, setData] = useState([...mock_users]);
  const { setIsVisible } = useMatchesModalContext();

  const OverlayLabelRight = useCallback(() => {
    return (
      <View
        style={[
          styles.overlayLabelContainer,
          {
            backgroundColor: 'green',
          },
        ]}>
        <MediumTitle>Suggest a Match</MediumTitle>
      </View>
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
        ]}>
        <MediumTitle>Looking for Someone Else</MediumTitle>
      </View>
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
        ]}>
        <MediumTitle>Explore Potential Match</MediumTitle>
      </View>
    );
  }, []);

  const OverlayLabelBottom = useCallback(() => {
    return (
      <View
        style={[
          styles.overlayLabelContainer,
          {
            backgroundColor: 'orange',
          },
        ]}>
        <MediumTitle>Make the First Move</MediumTitle>
      </View>
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
        if (index === Math.round(data.length / 2)) {
          setIsVisible(true);
        }
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
        router.push(`/user/${data[cardIndex].id}`);
      }}
      OverlayLabelRight={OverlayLabelRight}
      OverlayLabelLeft={OverlayLabelLeft}
      OverlayLabelTop={OverlayLabelTop}
      OverlayLabelBottom={OverlayLabelBottom}
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
    justifyContent: 'center',
  },
});
