import { useSession } from '@clerk/clerk-expo';
import FilterBottomSheet from '@components/home/bottom-sheet/FilterBottomSheet';
import Header from '@components/home/header/Header';
import Swipper from '@components/home/swipper/Swipper';
import BottomSheet from '@gorhom/bottom-sheet';
import React, { useEffect, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { type SwiperCardRefType } from 'rn-swiper-list';

import useMainSettingsOperations from '~/hooks/main-settings/useMainSettingsOperations';

const Page = () => {
  const { session } = useSession();

  const { fetchMainSettingsAvalability } = useMainSettingsOperations();

  const carouselRef = useRef<SwiperCardRefType>(null);
  const bottomSheetRef = useRef<BottomSheet>(null);

  useEffect(() => {
    if (session) {
      console.log('session home', session);

      fetchMainSettingsAvalability();
    }
  }, [session]);

  return (
    <>
      <GestureHandlerRootView style={styles.container}>
        <Header bottomSheetCurrent={bottomSheetRef.current} testID="header" />
        <View className="flex-1 px-5">
          <Swipper carouselRef={carouselRef} />
        </View>
        <FilterBottomSheet bottomSheetRef={bottomSheetRef} />
      </GestureHandlerRootView>
    </>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
