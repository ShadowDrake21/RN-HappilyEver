import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import useHandleCountries from '../handlers/useHandleCountries';
import useHandleCountrySearch from '../handlers/useHandleCountrySearch';

import { ICountry } from '~/types/country.types';

const useCountrySearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [countries, setCountries] = useState<ICountry[] | undefined>(undefined);

  const { allCountries, isLoading } = useHandleCountries();
  const debouncedSearch = useHandleCountrySearch(allCountries, setCountries);

  useEffect(() => {
    setCountries(allCountries);
  }, [allCountries]);

  return {
    searchQuery,
    setSearchQuery,
    countries,
    isLoading,
    debouncedSearch,
    setCountries,
    allCountries,
  };
};

export default useCountrySearch;

const styles = StyleSheet.create({});
