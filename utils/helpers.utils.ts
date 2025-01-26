import { useState } from 'react';
import { FieldErrors } from 'react-hook-form';

import LocalTokenStorage from '~/storage/LocalTokenStorage';
import { IMainSettingsExtendedForm } from '~/types/main-settings.types';

export const setAuthDataToStorage = async (
  accessToken: string,
  refreshToken: string,
  expirationTime: number
) => {
  await LocalTokenStorage.setItem('accessToken', accessToken);
  await LocalTokenStorage.setItem('refreshToken', refreshToken);
  await LocalTokenStorage.setItem('expirationTime', expirationTime || 0);
};

export const getErrorMessage = (
  errors: FieldErrors<IMainSettingsExtendedForm>,
  fieldName: string
): string | undefined => {
  const [firstField, secondField] = fieldName.split('.');
  return (errors?.[firstField as keyof IMainSettingsExtendedForm] as any)?.[secondField]?.message;
};
