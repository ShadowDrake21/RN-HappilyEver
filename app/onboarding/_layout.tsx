import { Stack } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { COLORS } from '~/constants/colors';

const Layout = () => {
  const { top, bottom } = useSafeAreaInsets();
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: COLORS.dark,
          paddingHorizontal: 20,
          paddingTop: top + 10,
          paddingBottom: bottom + 10,
        },
      }}>
      <Stack.Screen name="onboarding-first" options={{}} />
      <Stack.Screen name="onboarding-second" options={{}} />
      <Stack.Screen name="onboarding-third" options={{}} />
    </Stack>
  );
};

export default Layout;
