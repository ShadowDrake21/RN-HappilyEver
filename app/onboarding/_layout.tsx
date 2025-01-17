import { Stack } from 'expo-router';

const Layout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="/onboarding-first" options={{}} />
      <Stack.Screen name="/onboarding-second" options={{}} />
      <Stack.Screen name="/onboarding-third" options={{}} />
    </Stack>
  );
};

export default Layout;
