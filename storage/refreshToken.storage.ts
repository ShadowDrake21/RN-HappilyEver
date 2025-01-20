import AsyncStorage from '@react-native-async-storage/async-storage';

import { supabase } from '~/utils/supabase';

export const storeTokenData = async (refreshToken: string, expiresAt: number | undefined) => {
  try {
    await AsyncStorage.setItem('refreshToken', refreshToken);
    if (expiresAt !== undefined) {
      await AsyncStorage.setItem('tokenExpirationTime', expiresAt.toString());
    }
    console.log('Refresh token stored');
  } catch (error) {
    console.error('Failed to store refresh token', error);
  }
};

export const refreshToken = async () => {
  try {
    const refreshToken = await AsyncStorage.getItem('refreshToken');
    if (!refreshToken) throw new Error('No refresh token found');

    const { data, error } = await supabase.auth.refreshSession({ refresh_token: refreshToken });
    if (error) throw error;

    await storeTokenData(data?.session!.refresh_token, data?.session!.expires_at);

    return data.session?.access_token;
  } catch (error) {
    console.error('Failed to refresh token', error);

    return null;
  }
};
