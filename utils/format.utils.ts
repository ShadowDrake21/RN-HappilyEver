import {
  IMainSettingsBasicForm,
  ProfileInterestsCategory,
  ProfileInterestsIds,
} from '~/types/main-settings.types';

export const getInterestsLine = (
  category: ProfileInterestsCategory | undefined,
  profileInterest: ProfileInterestsIds
) =>
  category?.interests
    .filter((interest) => profileInterest.interestIds.some((id) => id === interest.id))
    .map((interest) => interest.title)
    .join(', ');

export const formatCategory = (category: string) => {
  return category.replace(/([a-z])([A-Z])/g, '$1 $2');
};

export const formatProfile = (
  rawProfile: unknown[]
): (IMainSettingsBasicForm & { id: string; user_id: string })[] => {
  return rawProfile.map((rawProfile) => {
    const profile = rawProfile as {
      id: string;
      user_id: string;
      fullName: string;
      username: string;
      gender: string;
      birthDate: string;
      phoneNumber: string;
      occupation: string;
    };

    return {
      id: profile.id,
      user_id: profile.user_id,
      fullName: profile.fullName,
      username: profile.username,
      gender: profile.gender,
      birthDate: profile.birthDate ? new Date(profile.birthDate) : undefined,
      phoneNumber: profile.phoneNumber,
      occupation: profile.occupation,
    };
  });
};
