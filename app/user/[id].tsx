import CustomLoader from '@components/ui/CustomLoader';
import UserBackgroundCarousel from '@components/user/UserBackgroundCarousel';
import UserBottomSheet from '@components/user/UserBottomSheet';
import BottomSheet from '@gorhom/bottom-sheet';
import { useQuery } from '@tanstack/react-query';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { useWindowDimensions } from 'react-native';
import { IconButton } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { mock_full_users } from '~/content/users.content';
import { ICountry } from '~/types/country.types';
import { IUserFullProfile } from '~/types/user.types';
import { fetchCountries } from '~/utils/fetch.utils';

// TODO: ADD PAGINATION TO CONTENT
const Page = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [user, setUser] = useState<IUserFullProfile | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    setLoading(true);

    const fetchedUser = mock_full_users.find((user) => user.id === id);
    setUser(fetchedUser);

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [id]);

  if (loading) return <CustomLoader />;

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTransparent: true,
          title: '',
          headerLeft: ({ tintColor }) => (
            <IconButton
              icon="arrow-left"
              iconColor={tintColor}
              size={20}
              onPress={() => router.back()}
            />
          ),
        }}
      />
      {user?.photos && <UserBackgroundCarousel photos={user?.photos} />}
      <UserBottomSheet user={user} />
    </>
  );
};

export default Page;
