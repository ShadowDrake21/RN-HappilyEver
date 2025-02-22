import EmptyLabel from '@components/ui/EmptyLabel';
import { FlashList } from '@shopify/flash-list';
import React from 'react';
import { View } from 'react-native';

import CountryItem from './CountryItem';

import { ICountry } from '~/types/country.types';

type CountryListProps = {
  countries: ICountry[] | undefined;
  handlePress: (id: string) => void;
  selectedCountryId: string | null;
};

const CountryList = ({ countries, handlePress, selectedCountryId }: CountryListProps) => {
  return (
    <FlashList
      data={countries || []}
      style={{ flex: 1 }}
      ItemSeparatorComponent={() => <View className="h-5 bg-transparent" />}
      renderItem={({ item }) => (
        <CountryItem
          country={item}
          onPress={() => handlePress(item.id)}
          isSelected={selectedCountryId === item.id}
        />
      )}
      showsVerticalScrollIndicator={false}
      estimatedItemSize={200}
      keyExtractor={(item) => item.id}
      extraData={selectedCountryId}
      ListEmptyComponent={<EmptyLabel>There is no country for this request</EmptyLabel>}
    />
  );
};

export default CountryList;
