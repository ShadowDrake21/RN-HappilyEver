import ParagraphText from '@components/ui/ParagraphText';
import React, { PropsWithRef, RefObject, useCallback, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Modal, PaperProvider, Portal, Text as PaperText } from 'react-native-paper';
import { Swiper, SwiperCardRefType } from 'rn-swiper-list';

import SwipperItem from './SwipperItem';
import SwipperModal from '../../InformationModal';

import { mock_users } from '~/content/users.content';
import { useMatchesModalContext } from '~/context/MatchesModalContext';

const Swipper = ({ carouselRef }: { carouselRef: PropsWithRef<RefObject<SwiperCardRefType>> }) => {
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
    <>
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
    </>
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
