import { useAuth, useSession, useUser } from '@clerk/clerk-expo';
import SwipperButton from '@components/home/swipper/SwipperButton';
import HeaderActionButton from '@components/main-settings/HeaderActionButton';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import Fontisto from '@expo/vector-icons/Fontisto';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useQuery } from '@tanstack/react-query';
import { LinearGradient } from 'expo-linear-gradient';
import { Tabs } from 'expo-router';
import React, { useEffect } from 'react';
import { Image, Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { Text as PaperText, Chip } from 'react-native-paper';
import Animated, {
  Extrapolation,
  FadeInDown,
  interpolate,
  useSharedValue,
} from 'react-native-reanimated';
import Carousel, { TAnimationStyle } from 'react-native-reanimated-carousel';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { COLORS } from '~/constants/colors';
import { mock_users } from '~/content/users.content';
import useMainSettingsOperations from '~/hooks/useMainSettingsOperations';
import { ICountry } from '~/types/country.types';
import { IUserProfile } from '~/types/user.types';
import { fetchCountries } from '~/utils/fetch.utils';
import { getFullYears } from '~/utils/helpers.utils';
const Page = () => {
  const { user } = useUser();
  const { signOut } = useAuth();
  const { session } = useSession();
  const { fetchMainSettingsAvalability } = useMainSettingsOperations();
  const { height, width } = useWindowDimensions();
  const { top } = useSafeAreaInsets();

  useEffect(() => {
    if (session) {
      console.log('session', !!session);

      fetchMainSettingsAvalability();
    }
  }, []);

  const headerHeight = 100;
  const PAGE_WIDTH = width;
  const PAGE_HEIGHT = (height - headerHeight) * 0.8;

  const directionAnimVal = useSharedValue(0);

  const data = [...mock_users];

  const animationStyle: TAnimationStyle = React.useCallback(
    (value: number) => {
      'worklet';
      const translateY = interpolate(value, [0, 1], [0, -18]);

      const translateX =
        interpolate(value, [-1, 0], [PAGE_WIDTH, 0], Extrapolation.CLAMP) * directionAnimVal.value;

      const rotateZ =
        interpolate(value, [-1, 0], [15, 0], Extrapolation.CLAMP) * directionAnimVal.value;

      const zIndex = interpolate(
        value,
        [0, 1, 2, 3, 4],
        [0, 1, 2, 3, 4].map((v) => (data.length - v) * 10),
        Extrapolation.CLAMP
      );

      const scale = interpolate(value, [-1, 0, 1], [0.8, 1, 0.8], Extrapolation.CLAMP);

      const opacity = interpolate(value, [-1, -0.8, 0, 1], [0, 0.9, 1, 0.85], Extrapolation.EXTEND);

      return {
        transform: [{ translateY }, { translateX }, { rotateZ: `${rotateZ}deg` }, { scale }],
        zIndex,
        opacity,
      };
    },
    [PAGE_HEIGHT, PAGE_WIDTH]
  );

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
      <View style={{ height: PAGE_HEIGHT, width: PAGE_WIDTH }}>
        <Carousel
          loop={false}
          style={{
            width: PAGE_WIDTH,
            height: PAGE_HEIGHT,
            // justifyContent: 'center',
            // alignItems: 'center',
          }}
          defaultIndex={0}
          vertical={false}
          width={PAGE_WIDTH}
          height={PAGE_HEIGHT}
          data={data}
          onConfigurePanGesture={(g) => {
            g.onChange((e) => {
              'worklet';
              directionAnimVal.value = Math.sign(e.translationX);
            });
          }}
          fixedDirection="negative"
          renderItem={({ index, item }) => <Item key={index} item={item} />}
          customAnimation={animationStyle}
          windowSize={5}
        />
        <View className="absolute -bottom-12 left-0 w-full flex-row items-end justify-center gap-5 p-4">
          <SwipperButton
            icon={<MaterialCommunityIcons name="shuffle-variant" size={24} color="grey" />}
            onPress={() => console.log('Shuffle')}
            type="secondary"
          />
          <SwipperButton
            icon={<MaterialCommunityIcons name="cancel" size={28} color="red" />}
            onPress={() => console.log('Remove')}
            type="secondary"
          />
          <SwipperButton
            icon={<AntDesign name="heart" size={28} color="pink" />}
            onPress={() => console.log('Like')}
            type="secondary"
          />
          <SwipperButton
            icon={<AntDesign name="star" size={24} color="yellow" />}
            onPress={() => console.log('Shuffle')}
            type="secondary"
          />
        </View>
      </View>
    </>
  );
};

const Item: React.FC<{ item: IUserProfile }> = ({ item }) => {
  const { height: windowHeight, width: windowWidth } = useWindowDimensions();
  const width = windowWidth * 0.9;
  const height = windowHeight * 0.9;
  const isUserActive = true;

  const { data: userCountry, isLoading } = useQuery<ICountry[]>({
    queryFn: () =>
      fetchCountries('https://restcountries.com/v3.1/alpha/' + item.countryId.toLowerCase()),
    queryKey: ['country', item.countryId],
  });

  useEffect(() => {
    console.log('userCountry', userCountry);
  }, [userCountry]);

  return (
    <Animated.View
      entering={FadeInDown.duration(300)}
      style={{
        flex: 1,
        width,
        height,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        position: 'relative',
        borderRadius: 20,
      }}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={{ uri: item.profileUrl }}
          style={{
            width,
            height,
            flex: 1,
            borderRadius: 20,
          }}
        />
        <LinearGradient
          // Background Linear Gradient
          colors={['rgba(150,0,255, 0.8)', 'transparent']}
          style={styles.background}
        />
        <View className="absolute bottom-10 left-0 w-full flex-row items-center p-4">
          <View>
            <PaperText variant="headlineMedium" style={{ color: 'white', fontWeight: 700 }}>
              {item.fullName.split(' ')[0]}, {getFullYears(item.birthDate)}
            </PaperText>
            <PaperText variant="titleSmall" style={{ color: 'white' }}>
              {item.occupation}, {userCountry?.[0]?.name?.common}
            </PaperText>
          </View>
          <View className="flex-1 items-center ">
            <Chip
              icon={() =>
                isUserActive ? (
                  <View
                    style={{ width: 10, height: 10, backgroundColor: 'green', borderRadius: 50 }}
                  />
                ) : (
                  <View
                    style={{ width: 10, height: 10, backgroundColor: 'red', borderRadius: 50 }}
                  />
                )
              }
              onPress={() => console.log('Pressed')}
              style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
              textStyle={{ color: 'white' }}>
              {isUserActive ? 'Active' : 'Inactive'}
            </Chip>
          </View>
        </View>
      </View>
    </Animated.View>
  );
};

export default Page;

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    transform: [{ rotate: '180deg' }],
    height: 400,
    borderRadius: 20,
  },
});
