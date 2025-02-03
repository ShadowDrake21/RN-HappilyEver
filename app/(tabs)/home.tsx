import { useAuth, useSession, useUser } from '@clerk/clerk-expo';
import Swipper from '@components/home/swipper/Swipper';
import SwipperButton from '@components/home/swipper/SwipperButton';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { Tabs } from 'expo-router';
import React, { useCallback, useEffect, useRef } from 'react';
import { Image, Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Text as PaperText } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { type SwiperCardRefType } from 'rn-swiper-list';

import { COLORS } from '~/constants/colors';
import useMainSettingsOperations from '~/hooks/useMainSettingsOperations';

const Page = () => {
  const { user } = useUser();
  const { signOut } = useAuth();
  const { session } = useSession();
  const { fetchMainSettingsAvalability } = useMainSettingsOperations();
  const { top } = useSafeAreaInsets();
  const carouselRef = useRef<SwiperCardRefType>(null);
  const bottomSheetRef = useRef<BottomSheet>(null);

  useEffect(() => {
    if (session) {
      console.log('session', !!session);

      fetchMainSettingsAvalability();
    }
  }, []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  return (
    <>
      <Tabs.Screen
        options={{
          header: () => (
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
                  <PaperText
                    variant="titleSmall"
                    style={{ fontWeight: 'bold', color: COLORS.gray }}>
                    {user?.fullName || user?.primaryEmailAddress?.emailAddress}
                  </PaperText>
                </View>
              </View>
              <View className="flex-row items-center gap-3">
                <Pressable onPress={() => console.log('settings')}>
                  <Feather name="search" size={24} color={COLORS.gray} />
                </Pressable>
                <Pressable onPress={() => console.log('settings')}>
                  <Feather name="settings" size={24} color={COLORS.gray} />
                </Pressable>
              </View>
            </View>
          ),
        }}
      />
      <GestureHandlerRootView style={styles.container}>
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
        <BottomSheet
          ref={bottomSheetRef}
          onChange={handleSheetChanges}
          snapPoints={['60%']}
          backgroundStyle={{ backgroundColor: COLORS.dark }}
          containerStyle={{ borderRadius: 20 }}
          onClose={() => console.log('close')}>
          <BottomSheetView style={styles.contentContainer} collapsable>
            <Text>Awesome 🎉</Text>
          </BottomSheetView>
        </BottomSheet>
      </GestureHandlerRootView>
    </>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    position: 'relative',
  },
  subContainer: {
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
    padding: 36,
    alignItems: 'center',
    backgroundColor: COLORS.dark,
  },
  // bottomSheet: {
  //   position: 'absolute',
  //   top: 0,
  //   left: 0,
  //   right: 0,
  //   bottom: 0,
  // },
});
