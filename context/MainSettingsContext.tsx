import { createContext, PropsWithChildren, useContext, useReducer, useState } from 'react';

import {
  IMainSettingsBasicForm,
  IMainSettingsExtendedForm,
  ProfileInterestsIds,
  ProfilePhoto,
} from '~/types/main-settings.types';

type MainSettingsContextType = {
  state: MainSettingsStateType;
  dispatch: React.Dispatch<MainSettingsActionType>;
};

type MainSettingsStateType = {
  countryId: string;
  profileBasicForm: IMainSettingsBasicForm | undefined;
  profileExtendedForm: IMainSettingsExtendedForm | undefined;
  photos: ProfilePhoto[];
  interests: ProfileInterestsIds[];
};

type MainSettingsActionType =
  | { type: 'SET_COUNTRY_ID'; payload: string }
  | { type: 'SET_PROFILE_BASIC_FORM'; payload: IMainSettingsBasicForm | undefined }
  | { type: 'SET_PROFILE_EXTENDED_FORM'; payload: IMainSettingsExtendedForm | undefined }
  | { type: 'SET_PHOTOS'; payload: ProfilePhoto[] }
  | { type: 'SET_INTERESTS'; payload: ProfileInterestsIds[] };

const MainSettingsContext = createContext<MainSettingsContextType | undefined>(undefined);

const MainSettingsState: MainSettingsStateType = {
  countryId: '',
  profileBasicForm: undefined,
  profileExtendedForm: undefined,
  photos: [],
  interests: [],
};

const reducer = (state: typeof MainSettingsState, action: MainSettingsActionType) => {
  switch (action.type) {
    case 'SET_COUNTRY_ID':
      return { ...state, countryId: action.payload };
    case 'SET_PROFILE_BASIC_FORM':
      return { ...state, profileBasicForm: action.payload };
    case 'SET_PROFILE_EXTENDED_FORM':
      return { ...state, profileExtendedForm: action.payload };
    case 'SET_PHOTOS':
      return { ...state, photos: action.payload };
    case 'SET_INTERESTS':
      return { ...state, interests: action.payload };
  }
};

export const MainSettingsProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(reducer, MainSettingsState);

  return (
    <MainSettingsContext.Provider
      value={{
        state,
        dispatch,
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
