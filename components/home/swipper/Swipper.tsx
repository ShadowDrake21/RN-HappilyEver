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

  const [data, setData] = useState([...mock_users]);

  const { userId, getToken } = useAuth();

  const { userGender } = useUserStorage();

  const { setIsVisible } = useMatchesModalContext();
  const { setIsSwipesLoading, isSwipesLoading } = useSwipesContext();

  useEffect(() => {
    fetchUserOfOppositeGender();
  }, []);

  const fetchUserOfOppositeGender = async () => {
    const token = await getToken({ template: 'supabase' });
    setIsSwipesLoading(true);
    if (token && userId) {
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

          return {
            ...profile,
            countryId: formattedLocation,
            profileUrl: downloadedImageUrl!,
          } as IUserProfile;
        })
      );

      setData((prev) => [...userProfiles, ...prev]);
    }
    setIsSwipesLoading(false);
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

  if (isSwipesLoading) return <CustomLoader />;
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
