import CountryItem from '@components/select-country/CountryItem';
import { FlashList } from '@shopify/flash-list';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Text as PaperText } from 'react-native-paper';

import { COLORS } from '~/constants/colors';
import { ICountry } from '~/types/country.types';

const Page = () => {
  const fetchCountries = async (): Promise<ICountry[]> => {
    return axios.get('https://restcountries.com/v3.1/all').then((res) => {
      const countries = res.data as any[];

      return countries.map((country) => ({
        id: country.cca2,
        name: country.name,
        flags: country.flags,
        phoneCode: country.idd.root,
      }));
    });
  };

  const [selectedCountry, setSelectedCountry] = useState('UA');

  useEffect(() => {
    console.log('selectedCountry', selectedCountry);
  }, [selectedCountry]);
  const { data: countries, isLoading } = useQuery<ICountry[]>({
    queryFn: fetchCountries,
    queryKey: ['countries'],
  });

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (!countries) {
    return <Text>No data</Text>;
  }

  return (
    <FlashList
      data={countries}
      ItemSeparatorComponent={() => <View className="h-5 bg-transparent" />}
      renderItem={({ item }) => (
        <CountryItem
          country={item}
          onPress={() => setSelectedCountry(item.id)}
          selectedCountry={selectedCountry}
        />
      )}
      showsVerticalScrollIndicator={false}
      estimatedItemSize={200}
      keyExtractor={(item) => item.id}
    />
  );
};

export default Page;

const styles = StyleSheet.create({});
