import { useCallback } from 'react';

import { useMainSettings } from '~/context/MainSettingsContext';

const useCountrySelection = () => {
  const { state, dispatch } = useMainSettings();

  const handlePress = useCallback(
    (id: string) => {
      dispatch({ type: 'SET_COUNTRY_ID', payload: id });
    },
    [dispatch]
  );

  return {
    selectedCountryId: state.countryId,
    handlePress,
  };
};

export default useCountrySelection;
