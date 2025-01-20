import AsyncStorage from '@react-native-async-storage/async-storage';

import { supabase } from '~/utils/supabase';

export const storeTokenData = async (refreshToken: string, expiresAt: number | undefined) => {
  try {
    await AsyncStorage.setItem('refreshToken', refreshToken);
    if (expiresAt !== undefined) {
      console.log('expiresAt', expiresAt);
      await AsyncStorage.setItem('tokenExpirationTime', expiresAt.toString());
    }
    console.log('Refresh token stored');
  } catch (error) {
    console.error('Failed to store refresh token', error);
  }
};

export const refreshToken = async () => {
  try {
    const token = await AsyncStorage.getItem('refreshToken');
    if (!token) throw new Error('No refresh token found');

    const { data, error } = await supabase.auth.refreshSession({ refresh_token: token });
    if (error) throw error;
    console.log('refreshToken -> data', data);
    await storeTokenData(data?.session!.refresh_token, data?.session!.expires_at);

    return data.session?.access_token;
  } catch (error) {
    console.error('Failed to refresh token', error);

    return null;
  }
};
