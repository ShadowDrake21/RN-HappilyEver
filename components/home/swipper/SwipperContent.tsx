import { useRouter } from 'expo-router';
import React, { memo, PropsWithRef, RefObject, useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { Swiper, SwiperCardRefType } from 'rn-swiper-list';

import SwipperItem from './SwipperItem';
import {
  OverlayLabelBottom,
  OverlayLabelLeft,
  OverlayLabelRight,
  OverlayLabelTop,
} from './SwipperOverlayLabels';

import { useMatchesModalContext } from '~/context/MatchesModalContext';
import useHandleSwipe from '~/hooks/handlers/useHandleSwipe';
import { IUserProfile } from '~/types/user.types';

type SwipperContentProps = {
  carouselRef: PropsWithRef<RefObject<SwiperCardRefType>>;
  users: IUserProfile[];
};

const SwipperContent = ({ carouselRef, users }: SwipperContentProps) => {
  const router = useRouter();

  const { setIsVisible } = useMatchesModalContext();
  const { onSwipe } = useHandleSwipe();

  const handleIndexChange = useCallback(
    (index: number) => {
      if (index === Math.round(users.length / 2) && users.length > 0) {
        setIsVisible(true);
      }
    },
    [users.length, setIsVisible]
  );

  const handleSwipeRight = useCallback(
    (cardIndex: number) => onSwipe(users[cardIndex].user_id, 'like'),
    [onSwipe, users]
  );

  const handleSwipeLeft = useCallback(
    (cardIndex: number) => onSwipe(users[cardIndex].user_id, 'not_interested'),
    [onSwipe, users]
  );

  const handleSwipeTop = useCallback(
    (cardIndex: number) => router.push(`/user/${users[cardIndex].id}`),
    [router, users]
  );

  return (
    <View style={styles.subContainer}>
      <Swiper
        ref={carouselRef}
        cardStyle={styles.cardStyle}
        data={users}
        renderCard={(item) => <SwipperItem item={item} />}
        onIndexChange={handleIndexChange}
        onSwipeRight={handleSwipeRight}
        onSwipeLeft={handleSwipeLeft}
        onSwipeTop={handleSwipeTop}
        OverlayLabelRight={OverlayLabelRight}
        OverlayLabelLeft={OverlayLabelLeft}
        OverlayLabelTop={OverlayLabelTop}
        OverlayLabelBottom={OverlayLabelBottom}
      />
    </View>
  );
};

export default memo(SwipperContent);

const styles = StyleSheet.create({
  cardStyle: {
    width: '100%',
    height: '100%',
    borderRadius: 25,
  },
  subContainer: {
    alignItems: 'center',
    height: '90%',
  },
});
