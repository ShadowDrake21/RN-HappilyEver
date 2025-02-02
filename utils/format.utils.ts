import { ProfileInterestsCategory, ProfileInterestsIds } from '~/types/main-settings.types';

export const getInterestsLine = (
  category: ProfileInterestsCategory | undefined,
  profileInterest: ProfileInterestsIds
) =>
  category?.interests
    .filter((interest) => profileInterest.interestIds.some((id) => id === interest.id))
    .map((interest) => interest.title)
    .join(', ');
