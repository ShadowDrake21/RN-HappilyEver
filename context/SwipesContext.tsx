import { createContext, PropsWithChildren, useContext, useMemo, useState } from 'react';

type SwipesContextType = {
  isSwipesLoading: boolean;
  setIsSwipesLoading: (value: boolean) => void;
};

const SwipesContext = createContext<SwipesContextType | undefined>(undefined);

export const SwipesProvider = ({ children }: PropsWithChildren) => {
  const [isSwipesLoading, setIsSwipesLoading] = useState(true);

  const value = useMemo(() => ({ isSwipesLoading, setIsSwipesLoading }), [isSwipesLoading]);

  return <SwipesContext.Provider value={value}>{children}</SwipesContext.Provider>;
};

export const useSwipesContext = () => {
  const context = useContext(SwipesContext);

  if (!context) {
    throw new Error('useSwipesContext must be within a SwipesProvider');
  }

  return context;
};
