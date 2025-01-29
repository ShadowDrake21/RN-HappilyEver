import { createContext, PropsWithChildren, useContext, useState } from 'react';

import {
  IMainSettingsBasicForm,
  IMainSettingsExtendedForm,
  ProfileInterestsCategory,
  ProfileInterestsCompressed,
  ProfilePhoto,
} from '~/types/main-settings.types';

type MainSettingsContextType = {
  countryId: string;
  profileBasicForm: IMainSettingsBasicForm | undefined;
  profileExtendedForm: IMainSettingsExtendedForm | undefined;
  photos: ProfilePhoto[];
  interests: ProfileInterestsCompressed[];
  setCountryId: React.Dispatch<React.SetStateAction<string>>;
  setProfileBasicForm: React.Dispatch<React.SetStateAction<IMainSettingsBasicForm | undefined>>;
  setProfileExtendedForm: React.Dispatch<
    React.SetStateAction<IMainSettingsExtendedForm | undefined>
  >;
  setPhotos: React.Dispatch<React.SetStateAction<ProfilePhoto[]>>;
  setInterests: React.Dispatch<React.SetStateAction<ProfileInterestsCompressed[]>>;
};

const MainSettingsContext = createContext<MainSettingsContextType | undefined>(undefined);

export const MainSettingsProvider = ({ children }: PropsWithChildren) => {
  const [countryId, setCountryId] = useState('');
  const [profileBasicForm, setProfileBasicForm] = useState<IMainSettingsBasicForm | undefined>(
    undefined
  );
  const [profileExtendedForm, setProfileExtendedForm] = useState<
    IMainSettingsExtendedForm | undefined
  >(undefined);
  const [photos, setPhotos] = useState<ProfilePhoto[]>([]);
  const [interests, setInterests] = useState<ProfileInterestsCompressed[]>([]);

  return (
    <MainSettingsContext.Provider
      value={{
        countryId,
        profileBasicForm,
        profileExtendedForm,
        photos,
        interests,
        setCountryId,
        setProfileBasicForm,
        setProfileExtendedForm,
        setPhotos,
        setInterests,
      }}>
      {children}
    </MainSettingsContext.Provider>
  );
};

export const useMainSettings = () => {
  const context = useContext(MainSettingsContext);

  if (!context) {
    throw new Error('useMainSettings must be within a MainSettingsProvider');
  }
  return context;
};
