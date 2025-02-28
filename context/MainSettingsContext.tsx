import { createContext, PropsWithChildren, useContext, useMemo, useReducer } from 'react';

import { mainSettingsReducer, MainSettingsState } from '~/reducers/main-settings.reducer';
import { MainSettingsActionType, MainSettingsStateType } from '~/types/main-settings.types';

type MainSettingsContextType = {
  state: MainSettingsStateType;
  dispatch: React.Dispatch<MainSettingsActionType>;
};

const MainSettingsContext = createContext<MainSettingsContextType | undefined>(undefined);

export const MainSettingsProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(mainSettingsReducer, MainSettingsState);

  const value = useMemo(() => ({ state, dispatch }), [state]);

  return <MainSettingsContext.Provider value={value}>{children}</MainSettingsContext.Provider>;
};

export const useMainSettings = () => {
  const context = useContext(MainSettingsContext);

  if (!context) {
    throw new Error('useMainSettings must be within a MainSettingsProvider');
  }
  return context;
};
