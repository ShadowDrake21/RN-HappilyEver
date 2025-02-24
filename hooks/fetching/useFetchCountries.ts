import { useQuery } from '@tanstack/react-query';
import { AxiosRequestConfig } from 'axios';

import { ICountry } from '~/types/country.types';
import { fetchCountries } from '~/utils/fetch.utils';

type useFetchCountriesType = {
  url: string;
  queryKey: readonly unknown[];
  enabled?: boolean;
  config?: AxiosRequestConfig<any> | undefined;
};

const useFetchCountries = ({ url, queryKey, enabled = true, config }: useFetchCountriesType) => {
  return useQuery<ICountry[]>({
    queryFn: () => fetchCountries(url, config),
    enabled,
    queryKey,
  });
};

export default useFetchCountries;
