import { debounce } from 'lodash';
import { useMemo } from 'react';

import { ICountry } from '~/types/country.types';

const useHandleCountrySearch = (
  allCountries: ICountry[] | undefined,
  setCountries: (countries: ICountry[] | undefined) => void
) => {
  const debouncedSearch = useMemo(
    () =>
      debounce((search: string) => {
        setCountries(
          allCountries?.filter((country) =>
            country.name.common.toLowerCase().includes(search.toLowerCase())
          )
        );
      }, 500),
    [allCountries]
  );

  return debouncedSearch;
};

export default useHandleCountrySearch;
