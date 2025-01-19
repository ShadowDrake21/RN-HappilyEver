import '../global.css';
import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="onboarding" />
      <Stack.Screen name="auth" />
    </Stack>
  );
}
