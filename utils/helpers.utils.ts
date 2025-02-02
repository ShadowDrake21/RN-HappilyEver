import { FieldErrors } from 'react-hook-form';

import { IMainSettingsExtendedForm, ProfileInterestsIds } from '~/types/main-settings.types';

export const getErrorMessage = (
  errors: FieldErrors<IMainSettingsExtendedForm>,
  fieldName: string
): string | undefined => {
  const [firstField, secondField] = fieldName.split('.');
  return (errors?.[firstField as keyof IMainSettingsExtendedForm] as any)?.[secondField]?.message;
};

export const addInterest = (all: ProfileInterestsIds[], newInterest: ProfileInterestsIds) => {
  const updatedInterests = [...all];
  const index = updatedInterests.findIndex((item) => item.categoryId === newInterest.categoryId);

  if (index !== -1) {
    updatedInterests[index].interestIds.push(newInterest.interestIds[0]);
  }

  return updatedInterests;
};

export const removeInterest = (all: ProfileInterestsIds[], newInterest: ProfileInterestsIds) => {
  const updatedInterests = [...all];
  const index = updatedInterests.findIndex((item) => item.categoryId === newInterest.categoryId);

  if (index !== -1) {
    updatedInterests[index].interestIds = updatedInterests[index].interestIds.filter(
      (id) => id !== newInterest.interestIds[0]
    );
    if (updatedInterests[index].interestIds.length === 0) {
      updatedInterests.splice(index, 1);
    }
  }

  return updatedInterests;
};

export const getFullYears = (data: Date | undefined) => {
  if (!data) return 0;
  const today = new Date();
  const diff = today.getTime() - data.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
};
