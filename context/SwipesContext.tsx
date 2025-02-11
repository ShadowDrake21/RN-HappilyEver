import { createContext, PropsWithChildren, useContext, useState } from 'react';

type SwipesContextType = {
  isSwipesLoading: boolean;
  setIsSwipesLoading: (value: boolean) => void;
};

const SwipesContext = createContext<SwipesContextType | undefined>(undefined);

export const SwipesProvider = ({ children }: PropsWithChildren) => {
  const [isSwipesLoading, setIsSwipesLoading] = useState(false);

  return (
    <SwipesContext.Provider value={{ isSwipesLoading, setIsSwipesLoading }}>
      {children}
    </SwipesContext.Provider>
  );
};

export const useSwipesContext = () => {
  const context = useContext(SwipesContext);

  if (!context) {
    throw new Error('useSwipesContext must be within a SwipesProvider');
  }

  return context;
};
