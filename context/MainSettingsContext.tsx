import { createContext, PropsWithChildren, useContext, useState } from 'react';

import {
  IMainSettingsBasicForm,
  IMainSettingsExtendedForm,
  ProfilePhoto,
} from '~/types/main-settings.types';

type MainSettingsContextType = {
  countryId: string;
  profileBasicForm: IMainSettingsBasicForm | undefined;
  profileExtendedForm: IMainSettingsExtendedForm | undefined;
  photos: ProfilePhoto[];
  setCountryId: React.Dispatch<React.SetStateAction<string>>;
  setProfileBasicForm: React.Dispatch<React.SetStateAction<IMainSettingsBasicForm | undefined>>;
  setProfileExtendedForm: React.Dispatch<
    React.SetStateAction<IMainSettingsExtendedForm | undefined>
  >;
  setPhotos: React.Dispatch<React.SetStateAction<ProfilePhoto[]>>;
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

  return (
    <MainSettingsContext.Provider
      value={{
        countryId,
        profileBasicForm,
        profileExtendedForm,
        photos,
        setCountryId,
        setProfileBasicForm,
        setProfileExtendedForm,
        setPhotos,
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
