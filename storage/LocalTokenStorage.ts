import AsyncStorage from '@react-native-async-storage/async-storage';

import { supabase } from '~/utils/supabase';

export default class LocalTokenStorage {
  private static readonly accessToken = 'accessToken';
  private static readonly refreshToken = 'refreshToken';
  private static readonly expirationTime = 'expirationTime';

  public static setAccessToken(token: string) {
    return AsyncStorage.setItem(LocalTokenStorage.accessToken, token);
  }

  public static async getAccessToken() {
    return AsyncStorage.getItem(LocalTokenStorage.accessToken);
  }

  public static removeAccessToken() {
    return AsyncStorage.removeItem(LocalTokenStorage.accessToken);
  }

  public static setRefreshToken(token: string) {
    return AsyncStorage.setItem(LocalTokenStorage.refreshToken, token);
  }

  public static async getRefreshToken() {
    return AsyncStorage.getItem(LocalTokenStorage.refreshToken);
  }

  public static removeRefreshToken() {
    return AsyncStorage.removeItem(LocalTokenStorage.refreshToken);
  }

  public static setExpirationTime(time: number) {
    console.log('setExpirationTime', time);
    return AsyncStorage.setItem(LocalTokenStorage.expirationTime, time.toString());
  }

  public static async getExpirationTime() {
    return AsyncStorage.getItem(LocalTokenStorage.expirationTime);
  }

  public static removeExpirationTime() {
    return AsyncStorage.removeItem(LocalTokenStorage.expirationTime);
  }

  public static async refreshAccessToken() {
    const refreshToken = await LocalTokenStorage.getRefreshToken();

    if (!refreshToken) {
      throw new Error('No refresh token found');
    }

    const { data, error } = await supabase.auth.refreshSession({ refresh_token: refreshToken });
    if (error) {
      throw new Error(error.message);
    }

    await LocalTokenStorage.setAccessToken(data.session?.access_token || '');
    await LocalTokenStorage.setRefreshToken(data.session?.refresh_token || '');
    await LocalTokenStorage.setExpirationTime(data.session?.expires_at || 0);

    return data.session?.access_token;
  }
}
