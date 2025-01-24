import { createContext, PropsWithChildren, useContext, useState } from 'react';

import { ICountry } from '~/types/country.types';
import { IMainSettingsBasicForm, IMainSettingsExtendedForm } from '~/types/main-settings.types';

type MainSettingsContextType = {
  countryId: string;
  profileBasicForm: IMainSettingsBasicForm | undefined;
  profileExtendedForm: IMainSettingsExtendedForm | undefined;
  setCountryId: (id: string) => void;
  setProfileBasicForm: (form: IMainSettingsBasicForm) => void;
  setProfileExtendedForm: (form: IMainSettingsExtendedForm) => void;
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

  return (
    <MainSettingsContext.Provider
      value={{
        countryId,
        profileBasicForm,
        profileExtendedForm,
        setCountryId,
        setProfileBasicForm,
        setProfileExtendedForm,
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
