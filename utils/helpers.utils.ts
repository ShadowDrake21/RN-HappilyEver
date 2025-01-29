import { FieldErrors } from 'react-hook-form';

import { IMainSettingsExtendedForm, ProfileInterestsCategory } from '~/types/main-settings.types';

export const getErrorMessage = (
  errors: FieldErrors<IMainSettingsExtendedForm>,
  fieldName: string
): string | undefined => {
  const [firstField, secondField] = fieldName.split('.');
  return (errors?.[firstField as keyof IMainSettingsExtendedForm] as any)?.[secondField]?.message;
};

export const toggleInterest = (
  currentInterests: ProfileInterestsCategory[],
  newInterest: ProfileInterestsCategory
): ProfileInterestsCategory[] => {
  console.log('interests:', currentInterests);
  const categoryIndex = currentInterests.findIndex(
    (item) => item.category === newInterest.category
  );

  console.log('Category Index:', categoryIndex);

  if (categoryIndex === -1) {
    return [...currentInterests, { ...newInterest, interests: [...newInterest.interests] }];
  }

  // Create a deep copy of the existing category
  const updatedCategory = {
    ...currentInterests[categoryIndex],
    interests: [...currentInterests[categoryIndex].interests],
  };

  const interestIndex = updatedCategory.interests.findIndex(
    (interest) => interest.title === newInterest.interests[0].title
  );

  if (interestIndex === -1) {
    updatedCategory.interests.push(newInterest.interests[0]);
  } else {
    updatedCategory.interests.splice(interestIndex, 1);
  }

  // Return a new array with the updated category
  return [
    ...currentInterests.slice(0, categoryIndex),
    updatedCategory,
    ...currentInterests.slice(categoryIndex + 1),
  ];
};
