import CountryList from '@components/select-country/CountryList';
import CountrySearchBar from '@components/select-country/CountrySearchBar';
import CustomLoader from '@components/ui/CustomLoader';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { View } from 'react-native';

import MainButtonLink from '~/components/ui/MainButtonLink';
import useCountrySearch from '~/hooks/main-settings/useCountrySearch';
import useCountrySelection from '~/hooks/main-settings/useCountrySelection';

const Page = () => {
  const {
    countries,
    setCountries,
    debouncedSearch,
    isLoading,
    searchQuery,
    setSearchQuery,
    allCountries,
  } = useCountrySearch();
  const { handlePress, selectedCountryId } = useCountrySelection();

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
      <CountrySearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        debouncedSearch={debouncedSearch}
      />
      <CountryList
        countries={countries}
        handlePress={handlePress}
        selectedCountryId={selectedCountryId}
      />
      <MainButtonLink href="./fill-profile-data" disabled={!selectedCountryId}>
        Continue
      </MainButtonLink>
    </View>
  );
};

export default Page;
