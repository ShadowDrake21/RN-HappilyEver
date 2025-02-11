import { useAuth } from '@clerk/clerk-expo';
import CustomLoader from '@components/ui/CustomLoader';
import MediumTitle from '@components/ui/MediumTitle';
import { useRouter } from 'expo-router';
import React, { memo, PropsWithRef, RefObject, useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Swiper, SwiperCardRefType } from 'rn-swiper-list';

import SwipperItem from './SwipperItem';

import { mock_users } from '~/content/users.content';
import { useMatchesModalContext } from '~/context/MatchesModalContext';
import { useSwipesContext } from '~/context/SwipesContext';
import { useUserStorage } from '~/store/store';
import { setSwipe } from '~/supabase/supabase-matching.requests';
import {
  getProfilePhotos,
  getProfilesByGender,
  getUserCountryId,
} from '~/supabase/supabase-typed.requests';
import { downloadImage } from '~/supabase/supabase.storage';
import { IUserProfile } from '~/types/user.types';
import { formatProfile } from '~/utils/format.utils';

const Swipper = ({ carouselRef }: { carouselRef: PropsWithRef<RefObject<SwiperCardRefType>> }) => {
  const router = useRouter();

  const [data, setData] = useState<IUserProfile[]>([]);

  const { userId, getToken } = useAuth();

  const { userGender } = useUserStorage();

  const { setIsVisible } = useMatchesModalContext();
  const { isSwipesLoading, setIsSwipesLoading } = useSwipesContext();

  useEffect(() => {
    if (userGender) fetchUserOfOppositeGender();
  }, [userGender]);

  const fetchUserOfOppositeGender = async () => {
    setIsSwipesLoading(true); // fix the problem when gender is not set
    if (!userGender) return;
    const token = await getToken({ template: 'supabase' });

    if (token && userId) {
      console.log('gender', userGender);

      const rawProfile = await getProfilesByGender(
        token,
        userGender === 'male' ? 'female' : 'male'
      );
      const formattedProfile = formatProfile(rawProfile);

      const userProfiles = await Promise.all(
        formattedProfile.map(async (profile) => {
          const rawLocation = await getUserCountryId(token, profile.user_id);
          const formattedLocation = (rawLocation as unknown as { country_id: string }[])[0]
            .country_id;

          const rawImages = await getProfilePhotos(token, profile.user_id);
          const formattedImageUrl = (rawImages as unknown as { photo_url: string }[])[0].photo_url;
          const downloadedImageUrl = await downloadImage({ token, imagePath: formattedImageUrl });

          setIsSwipesLoading(false);
          return {
            ...profile,
            user_id: profile.user_id,
            countryId: formattedLocation,
            profileUrl: downloadedImageUrl!,
          } as IUserProfile;
        })
      );

      setData((prev) => [...userProfiles, ...mock_users]);
    }
  };

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

  const onSwipe = async (swippedId: string, type: 'like' | 'not_interested') => {
    const token = await getToken({ template: 'supabase' });

    if (token && userId) {
      try {
        await setSwipe(token, userId, swippedId, type);
      } catch (error) {
        console.log(error);
      }
    }
  };

  if (isSwipesLoading || !userGender) {
    return <CustomLoader />;
  }
  return (
    <Swiper
      ref={carouselRef}
      cardStyle={styles.cardStyle}
      data={data}
      renderCard={(item) => <SwipperItem item={item} />}
      onIndexChange={(index) => {
        if (index === Math.round(data.length / 2) && data.length > 0) {
          setIsVisible(true);
        }
      }}
      onSwipeRight={(cardIndex) => onSwipe(data[cardIndex].user_id, 'like')}
      onSwipeLeft={(cardIndex) => onSwipe(data[cardIndex].user_id, 'not_interested')}
      onSwipedAll={() => {}}
      onSwipeTop={(cardIndex) => {
        router.push(`/user/${data[cardIndex].id}`);
      }}
      OverlayLabelRight={OverlayLabelRight}
      OverlayLabelLeft={OverlayLabelLeft}
      OverlayLabelTop={OverlayLabelTop}
      OverlayLabelBottom={OverlayLabelBottom}
      onSwipeActive={() => {}}
      onSwipeStart={() => {}}
      onSwipeEnd={() => {}}
    />
  );
};

export default memo(Swipper);

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
