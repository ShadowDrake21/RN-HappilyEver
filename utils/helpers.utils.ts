import { useState } from 'react';

import LocalTokenStorage from '~/storage/LocalTokenStorage';

export const setAuthDataToStorage = async (
  accessToken: string,
  refreshToken: string,
  expirationTime: number
) => {
  await LocalTokenStorage.setItem('accessToken', accessToken);
  await LocalTokenStorage.setItem('refreshToken', refreshToken);
  await LocalTokenStorage.setItem('expirationTime', expirationTime || 0);
};
