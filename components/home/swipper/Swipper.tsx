import CustomLoader from '@components/ui/CustomLoader';
import React, { memo, PropsWithRef, RefObject } from 'react';
import { SwiperCardRefType } from 'rn-swiper-list';

import SwipperActions from './SwipperActions';
import SwipperContent from './SwipperContent';

import { useSwipesContext } from '~/context/SwipesContext';
import useFetchOppositeGenderUsers from '~/hooks/fetching/useFetchOppositeGenderUsers';
import { useUserStorage } from '~/store/user.store';

type SwiperProps = {
  carouselRef: PropsWithRef<RefObject<SwiperCardRefType>>;
};

const Swipper = ({ carouselRef }: SwiperProps) => {
  const { userGender } = useUserStorage();
  const { isSwipesLoading } = useSwipesContext();
  const { data: users } = useFetchOppositeGenderUsers();

  if (isSwipesLoading || !userGender) {
    return <CustomLoader />;
  }
  return (
    <>
      <SwipperContent carouselRef={carouselRef} users={users} />
      {!isSwipesLoading && <SwipperActions carouselRef={carouselRef} />}
    </>
  );
};

export default memo(Swipper);
