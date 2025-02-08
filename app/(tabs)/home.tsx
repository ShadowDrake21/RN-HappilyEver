import { useAuth, useSession, useUser } from '@clerk/clerk-expo';
import FilterBottomSheet from '@components/home/bottom-sheet/FilterBottomSheet';
import Swipper from '@components/home/swipper/Swipper';
import SwipperButton from '@components/home/swipper/SwipperButton';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import BottomSheet from '@gorhom/bottom-sheet';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Text as PaperText } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { type SwiperCardRefType } from 'rn-swiper-list';

import { COLORS } from '~/constants/colors';
import useMainSettingsOperations from '~/hooks/useMainSettingsOperations';

const Page = () => {
  const { user } = useUser();
  const router = useRouter();
  const { signOut } = useAuth();
  const { session } = useSession();
  const { fetchMainSettingsAvalability } = useMainSettingsOperations();
  const { top } = useSafeAreaInsets();
  const carouselRef = useRef<SwiperCardRefType>(null);

  const bottomSheetRef = useRef<BottomSheet>(null);

  useEffect(() => {
    if (session) {
      fetchMainSettingsAvalability();
    }
  }, []);

  return (
    <>
      <GestureHandlerRootView style={styles.container}>
        <View className="flex-row items-center justify-between p-4" style={{ paddingTop: top }}>
          <View className="flex-row items-center gap-3">
            <Image
              source={{
                uri:
                  user?.imageUrl ||
                  'https://upload.wikimedia.org/wikipedia/commons/b/bc/Unknown_person.jpg',
              }}
              style={{ width: 50, height: 50, borderRadius: 25 }}
            />
            <View className="gap-2">
              <PaperText variant="titleSmall" style={{ color: COLORS.grayish }}>
                Let’s discover someone special!
              </PaperText>
              <PaperText variant="titleSmall" style={{ fontWeight: 'bold', color: COLORS.gray }}>
                {user?.fullName || user?.primaryEmailAddress?.emailAddress}
              </PaperText>
            </View>
          </View>
          <View className="flex-row items-center gap-3">
            <Pressable onPress={() => router.push('/search')}>
              <Feather name="search" size={24} color={COLORS.gray} />
            </Pressable>
            <Pressable
              onPress={() => {
                bottomSheetRef.current?.expand();
              }}>
              <Feather name="settings" size={24} color={COLORS.gray} />
            </Pressable>
          </View>
        </View>

        <View style={styles.subContainer}>
          <Swipper carouselRef={carouselRef} />
        </View>

        <View className="bottom-9  w-full flex-row items-end justify-center gap-5">
          <SwipperButton
            icon={<MaterialCommunityIcons name="shuffle-variant" size={24} color="grey" />}
            onPress={() => {
              console.log('shuffle');
            }}
            type="secondary"
          />
          <SwipperButton
            icon={<MaterialCommunityIcons name="cancel" size={28} color="red" />}
            onPress={() => carouselRef.current?.swipeLeft()}
            type="secondary"
          />
          <SwipperButton
            icon={<AntDesign name="heart" size={28} color="pink" />}
            onPress={() => carouselRef.current?.swipeRight()}
            type="secondary"
          />
          <SwipperButton
            icon={<AntDesign name="star" size={24} color="yellow" />}
            onPress={() => console.log('like')}
            type="secondary"
          />
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
  subContainer: {
    paddingHorizontal: 20,
    flex: 1,
    alignItems: 'center',
    height: '90%',
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
  // bottomSheet: {
  //   position: 'absolute',
  //   top: 0,
  //   left: 0,
  //   right: 0,
  //   bottom: 0,
  // },
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
