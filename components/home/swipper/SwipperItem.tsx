import CustomLoader from '@components/ui/CustomLoader';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

import SwipperItemContent from './item/SwipperItemContent';

import useFetchCountries from '~/hooks/fetching/useFetchCountries';
import { IUserProfile } from '~/types/user.types';

const SwipperItem = ({ item }: { item: IUserProfile }) => {
  const { data: userCountry, isLoading } = useFetchCountries({
    url: `https://restcountries.com/v3.1/alpha/${item.countryId.toLowerCase()}`,
    config: { params: { fields: 'name,flags,idd,cca2' } },

    queryKey: ['country', item.countryId],
  });

  if (isLoading) return <CustomLoader />;
  return (
    <View className="flex-1 items-center justify-center">
      <Image source={{ uri: item.profileUrl }} className="w-full flex-1 rounded-[25px]" />
      <LinearGradient colors={['rgba(150,0,255, 0.8)', 'transparent']} style={styles.background} />
      <SwipperItemContent item={item} country={userCountry} />
    </View>
  );
};

export default SwipperItem;

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    transform: [{ rotate: '180deg' }],
    height: 400,
    borderRadius: 25,
  },
});
