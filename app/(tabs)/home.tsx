import { useAuth, useSession, useUser } from '@clerk/clerk-expo';
import HeaderActionButton from '@components/main-settings/HeaderActionButton';
import Feather from '@expo/vector-icons/Feather';
import { Tabs } from 'expo-router';
import React, { useEffect } from 'react';
import { Image, Pressable, View, useWindowDimensions } from 'react-native';
import { Text as PaperText } from 'react-native-paper';
import Animated, {
  Extrapolation,
  FadeInDown,
  interpolate,
  useSharedValue,
} from 'react-native-reanimated';
import Carousel, { TAnimationStyle } from 'react-native-reanimated-carousel';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import useMainSettingsOperations from '~/hooks/useMainSettingsOperations';

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
  const PAGE_HEIGHT = (height - headerHeight) * 0.7;

  const directionAnimVal = useSharedValue(0);

  const data = [
    'https://i.pinimg.com/736x/0d/48/da/0d48dab8bb202a0594a3621149457cd8.jpg',
    'https://i.pinimg.com/736x/12/4d/52/124d522e99598ebab12830548752f0ff.jpg',
    'https://i.pinimg.com/736x/18/d4/66/18d466fe95be59d2f6b8c7499b395f56.jpg',
    'https://i.pinimg.com/736x/26/7e/f1/267ef15d3024c65e01a5cb9d9cdc172e.jpg',
    'https://i.pinimg.com/736x/62/d0/03/62d003e115866aa311b0afbe076b62c0.jpg',
    'https://i.pinimg.com/736x/2f/d8/2c/2fd82ce9bc1158363c219da88fb2adf5.jpg',
    'https://i.pinimg.com/736x/5a/ac/c3/5aacc396a82613c9bb422a0d683a3287.jpg',
    'https://i.pinimg.com/736x/96/19/ee/9619eea768fef8da46d2967963a38eea.jpg',
    'https://i.pinimg.com/736x/1e/eb/63/1eeb6385d073c6d4246d361e983c5ff7.jpg',
    'https://i.pinimg.com/736x/93/c8/39/93c8391da28158d061a340b3a3f16672.jpg',
    'https://i.pinimg.com/736x/cf/7f/af/cf7faf35edccd8e12e9db8a0140f7a6c.jpg',
  ];
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
                  <PaperText variant="titleSmall">Let’s discover someone special!</PaperText>
                  <PaperText variant="titleSmall" style={{ fontWeight: 'bold' }}>
                    {user?.fullName || user?.primaryEmailAddress?.emailAddress}
                  </PaperText>
                </View>
              </View>
              <View>
                <Pressable onPress={() => console.log('settings')}>
                  <Feather name="settings" size={24} color="black" />
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
          renderItem={({ index, item }) => <Item key={index} img={item} />}
          customAnimation={animationStyle}
          windowSize={5}
        />
      </View>
    </>
  );
};

const Item: React.FC<{ img: string }> = ({ img }) => {
  const { height: windowHeight, width: windowWidth } = useWindowDimensions();
  const width = windowWidth * 0.9;
  const height = windowHeight * 0.6;

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
      }}>
      <View
        style={{
          borderWidth: 1,
          borderColor: 'black',
          flex: 1,
          borderRadius: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={{ uri: img }}
          style={{
            width,
            height,
            borderRadius: 20,
            flex: 1,
          }}
        />
      </View>
    </Animated.View>
  );
};

export default Page;
