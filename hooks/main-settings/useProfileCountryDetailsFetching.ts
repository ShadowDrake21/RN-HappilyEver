import useFetchCountries from '../fetching/useFetchCountries';

import { useMainSettings } from '~/context/MainSettingsContext';

const useProfileCountryDetailsFetching = () => {
  const { state } = useMainSettings();

  const { data: countries, isLoading } = useFetchCountries({
    url: `https://restcountries.com/v3.1/alpha/${state.countryId}`,
    config: { params: { fields: 'name,flags,idd,cca2' } },
    queryKey: ['countries'],
  });

  return { countries, isLoading };
};

export default useProfileCountryDetailsFetching;
