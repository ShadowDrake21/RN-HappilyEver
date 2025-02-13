import { useSession } from '@clerk/clerk-expo';
import FilterBottomSheet from '@components/home/bottom-sheet/FilterBottomSheet';
import Header from '@components/home/header/Header';
import Swipper from '@components/home/swipper/Swipper';
import BottomSheet from '@gorhom/bottom-sheet';
import React, { useEffect, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { type SwiperCardRefType } from 'rn-swiper-list';

import useMainSettingsOperations from '~/hooks/useMainSettingsOperations';

const Page = () => {
  const { session } = useSession();

  const { fetchMainSettingsAvalability } = useMainSettingsOperations();

  const carouselRef = useRef<SwiperCardRefType>(null);
  const bottomSheetRef = useRef<BottomSheet>(null);

  useEffect(() => {
    if (session) {
      fetchMainSettingsAvalability();
    }
  }, [session]);

  return (
    <>
      <GestureHandlerRootView style={styles.container}>
        <Header bottomSheetCurrent={bottomSheetRef.current} />
        <View style={styles.carouselContainer}>
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
  carouselContainer: {
    paddingHorizontal: 20,
    flex: 1,
  },
  buttonsContainer: {
    flexDirection: 'row',
    bottom: 34,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    height: 80,
    borderRadius: 40,
    marginHorizontal: 20,
    aspectRatio: 1,
    backgroundColor: '#3A3D45',
    elevation: 4,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  contentContainer: {
    flex: 1,
    padding: 20,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
