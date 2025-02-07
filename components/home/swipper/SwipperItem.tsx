import ActivityBadge from '@components/shared/ActivityBadge';
import { useQuery } from '@tanstack/react-query';
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Text as PaperText, Chip } from 'react-native-paper';

import { ICountry } from '~/types/country.types';
import { IUserProfile } from '~/types/user.types';
import { fetchCountries } from '~/utils/fetch.utils';
import { getFullYears } from '~/utils/helpers.utils';

const SwipperItem = ({ item }: { item: IUserProfile }) => {
  const isUserActive = true;

  const { data: userCountry, isLoading } = useQuery<ICountry[]>({
    queryFn: () =>
      fetchCountries('https://restcountries.com/v3.1/alpha/' + item.countryId.toLowerCase()),
    queryKey: ['country', item.countryId],
  });

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Image
        source={{ uri: item.profileUrl }}
        style={{
          width: '100%',
          flex: 1,
          borderRadius: 25,
        }}
      />
      <LinearGradient
        // Background Linear Gradient
        colors={['rgba(150,0,255, 0.8)', 'transparent']}
        style={styles.background}
      />
      <View className="absolute bottom-10 left-0 w-full flex-row items-center p-4">
        <View>
          <PaperText variant="headlineMedium" style={{ color: 'white', fontWeight: 700 }}>
            {item.fullName.split(' ')[0]}, {getFullYears(item.birthDate)}
          </PaperText>
          <PaperText variant="titleSmall" style={{ color: 'white' }}>
            {item.occupation}, {userCountry?.[0]?.name?.common}
          </PaperText>
        </View>
        <View className="flex-1 items-center ">
          <ActivityBadge isUserActive={isUserActive} onPress={() => console.log('Pressed')} />
        </View>
      </View>
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
