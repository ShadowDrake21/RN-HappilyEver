import CustomLoader from '@components/ui/CustomLoader';
import UserBackgroundCarousel from '@components/user/UserBackgroundCarousel';
import UserBottomSheet from '@components/user/user-bottom-sheet/UserBottomSheet';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { IconButton } from 'react-native-paper';

import useFetchUser from '~/hooks/user/useFetchUser';

// TODO: ADD PAGINATION TO CONTENT
const Page = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { user, loading } = useFetchUser(id);

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
