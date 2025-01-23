import { createContext, PropsWithChildren, useContext, useState } from 'react';

import { ICountry } from '~/types/country.types';
import { IMainSettingsForm } from '~/types/main-settings.types';

type MainSettingsContextType = {
  countryId: string;
  profileForm: IMainSettingsForm | undefined;
  setCountryId: (id: string) => void;
  setProfileForm: (form: IMainSettingsForm) => void;
};

const MainSettingsContext = createContext<MainSettingsContextType | undefined>(undefined);

export const MainSettingsProvider = ({ children }: PropsWithChildren) => {
  const [countryId, setCountryId] = useState('');
  const [profileForm, setProfileForm] = useState<IMainSettingsForm | undefined>(undefined);

  return (
    <MainSettingsContext.Provider value={{ countryId, profileForm, setCountryId, setProfileForm }}>
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
