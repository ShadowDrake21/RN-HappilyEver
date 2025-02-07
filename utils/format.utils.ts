import { ProfileInterestsCategory, ProfileInterestsIds } from '~/types/main-settings.types';

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
