import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { AppState, AppStateStatus } from 'react-native';

import LocalTokenStorage from '~/storage/LocalTokenStorage';

const useTokenExpiration = () => {
  const [expirationTime, setExpirationTime] = useState<number | null>(null);

  const checkTokenExpiration = async () => {
    if (expirationTime === null) {
      const storedExpirationTime = await AsyncStorage.getItem('expirationTime');

      if (storedExpirationTime) {
        const expiresAt = parseInt(storedExpirationTime, 10);
        setExpirationTime(expiresAt);
        if (Date.now() >= expiresAt * 1000) {
          await LocalTokenStorage.refreshAccessToken();
        }
      }
    } else {
      if (Date.now() >= expirationTime * 1000) {
        await LocalTokenStorage.refreshAccessToken();
      }
    }
  };

  useEffect(() => {
    const handleAppStateChange = async (nextAppState: AppStateStatus) => {
      if (nextAppState === 'active') {
        await checkTokenExpiration();
      }
    };

    const sub = AppState.addEventListener('change', handleAppStateChange);
    return () => {
      sub.remove();
    };
  }, [expirationTime]);

  useFocusEffect(
    useCallback(() => {
      checkTokenExpiration();
    }, [expirationTime])
  );
};

export default useTokenExpiration;
