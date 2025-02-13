import axios, { AxiosRequestConfig } from 'axios';

import { ICountry } from '~/types/country.types';

export const fetchCountries = async (
  url: string = 'https://restcountries.com/v3.1/all',
  config?: AxiosRequestConfig<any> | undefined
): Promise<ICountry[]> => {
  return axios
    .get(url)
    .then((res) => {
      const countries = res.data as any[];
      return countries.map((country) => ({
        id: country.cca2,
        name: country.name,
        flags: country.flags,
        phoneCode: country.idd.root,
      }));
    })
    .catch((err) => {
      if (axios.isAxiosError(err)) {
        console.error('Axios error:', err.message);
      } else {
        console.error('Unexpected error:', err);
      }
      return [];
    });
};
