import { createContext, PropsWithChildren, useContext } from 'react';

import useProfileImageSelection from '~/hooks/contexts/useProfileImageSelection';

type ProfileImageSelectionContextType = ReturnType<typeof useProfileImageSelection>;

const ProfileImageSelectionContext = createContext<ProfileImageSelectionContextType | undefined>(
  undefined
);

export const ProfileImageSelectionProvider = ({ children }: PropsWithChildren) => {
  const value = useProfileImageSelection();

  return (
    <ProfileImageSelectionContext.Provider value={value}>
      {children}
    </ProfileImageSelectionContext.Provider>
  );
};

export const useProfileImageSelectionContext = () => {
  const context = useContext(ProfileImageSelectionContext);

  if (!context) {
    throw new Error(
      'useProfileImageSelectionContext must be within a ProfileImageSelectionProvider'
    );
  }

  return context;
};
