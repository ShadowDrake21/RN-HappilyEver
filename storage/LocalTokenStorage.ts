import AsyncStorage from '@react-native-async-storage/async-storage';

import { supabase } from '~/utils/supabase';

export default class LocalTokenStorage {
  private static readonly accessToken = 'accessToken';
  private static readonly refreshToken = 'refreshToken';
  private static readonly expirationTime = 'expirationTime';

  private static readonly keys = {
    accessToken: 'accessToken',
    refreshToken: 'refreshToken',
    expirationTime: 'expirationTime',
  };

  public static async setItem(key: keyof typeof LocalTokenStorage.keys, value: string | number) {
    try {
      await AsyncStorage.setItem(key, value + '');
    } catch (error) {
      console.error(`Error setting ${key} in Async Storage:`, error);
    }
  }

  public static async getItem(key: keyof typeof LocalTokenStorage.keys) {
    try {
      return await AsyncStorage.getItem(key);
    } catch (error) {
      console.error(`Error getting ${key} from Async Storage:`, error);
    }
  }

  public static async removeItem(key: keyof typeof LocalTokenStorage.keys) {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing ${key} from Async Storage:`, error);
    }
  }

  public static clearAll() {
    return AsyncStorage.multiRemove([
      LocalTokenStorage.accessToken,
      LocalTokenStorage.refreshToken,
      LocalTokenStorage.expirationTime,
    ]);
  }

  public static async refreshAccessToken() {
    const refreshToken = await LocalTokenStorage.getItem('refreshToken');

    if (!refreshToken) {
      throw new Error('No refresh token found');
    }

    const { data, error } = await supabase.auth.refreshSession({ refresh_token: refreshToken });
    if (error) {
      throw new Error(error.message);
    }

    await LocalTokenStorage.setItem('accessToken', data.session?.access_token || '');
    await LocalTokenStorage.setItem('refreshToken', data.session?.refresh_token || '');
    await LocalTokenStorage.setItem('expirationTime', data.session?.expires_at || 0);

    return data.session?.access_token;
  }
}
