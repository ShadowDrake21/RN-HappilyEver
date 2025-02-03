import { useAuth, useSession, useUser } from '@clerk/clerk-expo';
import Swipper from '@components/home/swipper/Swipper';
import SwipperButton from '@components/home/swipper/SwipperButton';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Tabs } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import { Image, Pressable, StyleSheet, View, useWindowDimensions } from 'react-native';
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

  useEffect(() => {
    if (session) {
      console.log('session', !!session);

      fetchMainSettingsAvalability();
    }
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
              <View>
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
});
