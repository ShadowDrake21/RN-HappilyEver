import { createContext, PropsWithChildren, useContext, useMemo, useState } from 'react';

type MatchesModalContextType = {
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
};

const MatchesModalContext = createContext<MatchesModalContextType | undefined>(undefined);

export const MatchesModalProvider = ({ children }: PropsWithChildren) => {
  const [isVisible, setIsVisible] = useState(false);

  const value = useMemo(() => ({ isVisible, setIsVisible }), [isVisible]);

  return <MatchesModalContext.Provider value={value}>{children}</MatchesModalContext.Provider>;
};

export const useMatchesModalContext = () => {
  const context = useContext(MatchesModalContext);

  if (!context) {
    throw new Error('useMatchesModalContext must be within a MatchesModalProvider');
  }

  return context;
};
