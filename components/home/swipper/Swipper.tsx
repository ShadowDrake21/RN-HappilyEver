import CustomLoader from '@components/ui/CustomLoader';
import { useRouter } from 'expo-router';
import React, { memo, PropsWithRef, RefObject } from 'react';
import { StyleSheet, View } from 'react-native';
import { Swiper, SwiperCardRefType } from 'rn-swiper-list';

import SwipperActions from './SwipperActions';
import SwipperItem from './SwipperItem';
import {
  OverlayLabelBottom,
  OverlayLabelLeft,
  OverlayLabelRight,
  OverlayLabelTop,
} from './SwipperOverlayLabels';

import { useMatchesModalContext } from '~/context/MatchesModalContext';
import { useSwipesContext } from '~/context/SwipesContext';
import useFetchOppositeGenderUsers from '~/hooks/useFetchOppositeGenderUsers';
import useSwipeHandler from '~/hooks/useSwipeHandler';
import { useUserStorage } from '~/store/store';

const Swipper = ({ carouselRef }: { carouselRef: PropsWithRef<RefObject<SwiperCardRefType>> }) => {
  const router = useRouter();

  const { userGender } = useUserStorage();

  const { setIsVisible } = useMatchesModalContext();
  const { isSwipesLoading } = useSwipesContext();

  const { data: users } = useFetchOppositeGenderUsers();
  const { onSwipe } = useSwipeHandler();

  if (isSwipesLoading || !userGender) {
    return <CustomLoader />;
  }
  return (
    <>
      <View style={styles.subContainer}>
        <Swiper
          ref={carouselRef}
          cardStyle={styles.cardStyle}
          data={users}
          renderCard={(item) => <SwipperItem item={item} />}
          onIndexChange={(index) => {
            if (index === Math.round(users.length / 2) && users.length > 0) {
              setIsVisible(true);
            }
          }}
          onSwipeRight={(cardIndex) => onSwipe(users[cardIndex].user_id, 'like')}
          onSwipeLeft={(cardIndex) => onSwipe(users[cardIndex].user_id, 'not_interested')}
          onSwipedAll={() => {}}
          onSwipeTop={(cardIndex) => {
            router.push(`/user/${users[cardIndex].id}`);
          }}
          OverlayLabelRight={OverlayLabelRight}
          OverlayLabelLeft={OverlayLabelLeft}
          OverlayLabelTop={OverlayLabelTop}
          OverlayLabelBottom={OverlayLabelBottom}
        />
      </View>
      {!isSwipesLoading && <SwipperActions carouselRef={carouselRef} />}
    </>
  );
};

export default memo(Swipper);

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
