import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import useFetchCountries from './useFetchCountries';

import { ICountry } from '~/types/country.types';

const useCountries = () => {
  const { data: allCountries, isLoading } = useFetchCountries({
    url: 'https://restcountries.com/v3.1/all',
    config: { params: { fields: 'name,flags,idd,cca2' } },
    queryKey: ['allCountries'],
  });

  return { allCountries, isLoading };
};

export default useCountries;

const styles = StyleSheet.create({});
