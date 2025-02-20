import { useEffect, useState } from 'react';

import { profileInterests } from '~/content/profile-interests.content';
import { ProfileInterestsCategory, ProfileInterestsIds } from '~/types/main-settings.types';

const useHandleCategories = (interestsIds: ProfileInterestsIds[]) => {
  const [categoryItems, setCategoryItems] = useState<ProfileInterestsCategory[]>([]);

  useEffect(() => {
    handleCategories();

    return () => {
      setCategoryItems([]);
    };
  }, [interestsIds]);

  const handleCategories = () => {
    interestsIds.forEach((interest) => {
      const selectedCategory = profileInterests.find((item) => item.id === interest.categoryId)!;
      const selectedInterests = selectedCategory?.interests.filter((item) =>
        interest.interestIds.includes(item.id)
      )!;

      setCategoryItems((prev) => [
        ...prev,
        {
          id: selectedCategory?.id,
          category: selectedCategory?.category,
          interests: selectedInterests,
        },
      ]);
    });
  };

  return categoryItems;
};

export default useHandleCategories;
