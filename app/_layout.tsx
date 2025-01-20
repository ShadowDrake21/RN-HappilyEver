import AsyncStorage from '@react-native-async-storage/async-storage';
import '../global.css';
import { Stack, useNavigation, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { AppState, AppStateStatus } from 'react-native';

import { refreshToken } from '~/storage/refreshToken.storage';

export default function Layout() {
  const navigation = useNavigation();
  const [expirationTime, setExpirationTime] = useState<number | null>(null);

  const checkTokenExpiration = async () => {
    if (expirationTime === null) {
      const storedExpirationTime = await AsyncStorage.getItem('tokenExpirationTime');
      console.log('checkTokenExpiration -> expirationTime', expirationTime, Date.now());

      if (storedExpirationTime) {
        const expiresAt = parseInt(storedExpirationTime, 10);
        setExpirationTime(expiresAt);
        if (Date.now() >= expiresAt * 1000) {
          await refreshToken();
        }
      }
    } else {
      if (Date.now() >= expirationTime * 1000) {
        await refreshToken();
      }
    }
  };

  useEffect(() => {
    const handleAppStateChange = async (nextAppState: AppStateStatus) => {
      if (nextAppState === 'active') {
        await checkTokenExpiration();
      }
    };

    AppState.addEventListener('change', handleAppStateChange);
  }, [expirationTime]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('state', async () => {
      await checkTokenExpiration();
    });

    return () => {
      unsubscribe();
    };
  }, [navigation, expirationTime]);

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
