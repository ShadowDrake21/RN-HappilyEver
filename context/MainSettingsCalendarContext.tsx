import { createContext, PropsWithChildren, useContext, useMemo, useState } from 'react';

type MainSettingsCalendarContextType = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  toggleSheet: () => void;
  collapseSheet: () => void;
  onChangeCalendar: (...event: any[]) => void;
  setOnChangeCalendar: React.Dispatch<React.SetStateAction<(...event: any[]) => void>>;
};

const MainSettingsCalendarContext = createContext<MainSettingsCalendarContextType | undefined>(
  undefined
);

export const MainSettingsCalendarProvider = ({ children }: PropsWithChildren) => {
  const [isOpen, setIsOpen] = useState(false);
  const [onChangeCalendar, setOnChangeCalendar] = useState<(...event: any[]) => void>(() => {});

  const toggleSheet = () => {
    setIsOpen(!isOpen);
  };

  const collapseSheet = () => {
    setIsOpen(false);
  };

  const setOnChange = (func: (...event: any[]) => void) => {
    console.log('setOnChange');
    console.log(func);
    setOnChangeCalendar(func);
  };

  const value = useMemo(
    () => ({
      isOpen,
      setIsOpen,
      toggleSheet,
      collapseSheet,
      onChangeCalendar,
      setOnChangeCalendar: setOnChange,
    }),
    [isOpen]
  );

  return (
    <MainSettingsCalendarContext.Provider value={value}>
      {children}
    </MainSettingsCalendarContext.Provider>
  );
};

export const useMainSettingsCalendarContext = () => {
  const context = useContext(MainSettingsCalendarContext);

  if (!context) {
    throw new Error('useMainSettingsCalendarContext must be within a MainSettingsCalendarProvider');
  }

  return context;
};
