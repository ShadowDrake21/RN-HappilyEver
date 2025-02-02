import { createContext, PropsWithChildren, useContext, useReducer } from 'react';

import { MainSettingsActionType, MainSettingsStateType } from '~/types/main-settings.types';

type MainSettingsContextType = {
  state: MainSettingsStateType;
  dispatch: React.Dispatch<MainSettingsActionType>;
};

const MainSettingsContext = createContext<MainSettingsContextType | undefined>(undefined);

const MainSettingsState: MainSettingsStateType = {
  countryId: '',
  profileBasicForm: undefined,
  profileExtendedForm: undefined,
  photos: [],
  interests: [],
  idealMatch: undefined,
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
    case 'SET_IDEAL_MATCH':
      return { ...state, idealMatch: action.payload };
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
