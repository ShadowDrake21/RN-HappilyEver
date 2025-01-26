import CountryItem from '@components/select-country/CountryItem';
import CustomLoader from '@components/ui/CustomLoader';
import EmptyLabel from '@components/ui/EmptyLabel';
import { useFocusEffect } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import { useQuery } from '@tanstack/react-query';
import debounce from 'lodash/debounce';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { View } from 'react-native';
import { Searchbar } from 'react-native-paper';

import MainButtonLink from '~/components/ui/MainButtonLink';
import { COLORS } from '~/constants/colors';
import { useMainSettings } from '~/context/MainSettingsContext';
import { ICountry } from '~/types/country.types';
import { fetchCountries } from '~/utils/fetch.utils';

const Page = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [countries, setCountries] = useState<ICountry[] | undefined>(undefined);

  const { countryId, setCountryId } = useMainSettings();

  const handlePress = useCallback((id: string) => {
    setCountryId(id);
  }, []);

  const { data: allCountries, isLoading } = useQuery<ICountry[]>({
    queryFn: () => fetchCountries('https://restcountries.com/v3.1/all?fields=name,flags,idd,cca2'),
    queryKey: ['allCountries'],
  });

  useEffect(() => {
    setCountries(allCountries);
  }, [allCountries]);

  const debouncedSearch = useMemo(
    () =>
      debounce((search: string) => {
        setCountries(() => {
          return allCountries?.filter((country) =>
            country.name.common.toLowerCase().includes(search.toLowerCase())
          );
        });
      }, 500),
    [allCountries]
  );

  useFocusEffect(
    useCallback(() => {
      setSearchQuery('');
      setCountries(allCountries);
    }, [allCountries])
  );

  if (isLoading) {
    return <CustomLoader />;
  }

  return (
    <View style={{ flex: 1, gap: 20 }}>
      <Searchbar
        placeholder="Search"
        onChangeText={(text) => {
          setSearchQuery(text);
          debouncedSearch(text);
        }}
        value={searchQuery}
        style={{ backgroundColor: COLORS.extraDark, borderRadius: 10 }}
        placeholderTextColor={COLORS.grayish}
        iconColor={COLORS.grayish}
        inputStyle={{ color: COLORS.text }}
      />

      <FlashList
        data={countries || []}
        style={{ flex: 1 }}
        ItemSeparatorComponent={() => <View className="h-5 bg-transparent" />}
        renderItem={({ item }) => (
          <CountryItem
            country={item}
            onPress={() => handlePress(item.id)}
            isSelected={countryId === item.id}
          />
        )}
        showsVerticalScrollIndicator={false}
        estimatedItemSize={200}
        keyExtractor={(item) => item.id}
        extraData={countryId}
        ListEmptyComponent={<EmptyLabel>There is no country for this request</EmptyLabel>}
      />

      <MainButtonLink href="./fill-profile-data" disabled={!countryId}>
        Continue
      </MainButtonLink>
    </View>
  );
};

export default Page;
