import CountryItem from '@components/select-country/CountryItem';
import CustomLoader from '@components/ui/CustomLoader';
import EmptyLabel from '@components/ui/EmptyLabel';
import { useFocusEffect } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import React, { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import { Searchbar } from 'react-native-paper';

import MainButtonLink from '~/components/ui/MainButtonLink';
import { COLORS } from '~/constants/colors';
import { useMainSettings } from '~/context/MainSettingsContext';
import useCountries from '~/hooks/useCountries';
import useCountrySearch from '~/hooks/useCountrySearch';
import { ICountry } from '~/types/country.types';

const Page = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [countries, setCountries] = useState<ICountry[] | undefined>(undefined);

  const { state, dispatch } = useMainSettings();

  const handlePress = useCallback((id: string) => {
    dispatch({ type: 'SET_COUNTRY_ID', payload: id });
  }, []);
  const { allCountries, isLoading } = useCountries();
  const debouncedSearch = useCountrySearch(allCountries, setCountries);

  useEffect(() => {
    setCountries(allCountries);
  }, [allCountries]);

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
            isSelected={state.countryId === item.id}
          />
        )}
        showsVerticalScrollIndicator={false}
        estimatedItemSize={200}
        keyExtractor={(item) => item.id}
        extraData={state.countryId}
        ListEmptyComponent={<EmptyLabel>There is no country for this request</EmptyLabel>}
      />

      <MainButtonLink href="./fill-profile-data" disabled={!state.countryId}>
        Continue
      </MainButtonLink>
    </View>
  );
};

export default Page;
