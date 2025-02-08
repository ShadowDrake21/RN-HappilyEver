import CustomLoader from '@components/ui/CustomLoader';
import UserBackgroundCarousel from '@components/user/UserBackgroundCarousel';
import UserBasicInfo from '@components/user/UserBasicInfo';
import UserIdealMatch from '@components/user/UserIdealMatch';
import UserInterests from '@components/user/UserInterests';
import UserPhotos from '@components/user/UserPhotos';
import UserQuestions from '@components/user/UserQuestions';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { useQuery } from '@tanstack/react-query';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { IconButton } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { COLORS } from '~/constants/colors';
import { unknownFlag } from '~/constants/links';
import { mock_full_users } from '~/content/users.content';
import { ICountry } from '~/types/country.types';
import { IUserFullProfile } from '~/types/user.types';
import { fetchCountries } from '~/utils/fetch.utils';

// TODO: ADD PAGINATION TO CONTENT + FINISH REFACTORING
const Page = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [user, setUser] = useState<IUserFullProfile | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const { top } = useSafeAreaInsets();

  const bottomSheetRef = useRef<BottomSheet>(null);
  const isUserActive = true;
  const { width } = useWindowDimensions();
  const { bottom } = useSafeAreaInsets();

  const { data: userCountry, isLoading } = useQuery<ICountry[]>({
    queryFn: () =>
      fetchCountries('https://restcountries.com/v3.1/alpha/' + user!.countryId.toLowerCase()),
    enabled: !!user,
    queryKey: ['country'],
  });

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
      <GestureHandlerRootView style={{ flex: 1, zIndex: 20, position: 'relative' }}>
        <BottomSheet
          ref={bottomSheetRef}
          onClose={() => bottomSheetRef.current?.close()}
          snapPoints={['20%', '80%']}
          backgroundStyle={{ backgroundColor: COLORS.extraDark, borderRadius: 25 }}
          containerStyle={[styles.container, { marginTop: top }]}
          index={0}>
          {user && (
            <BottomSheetScrollView
              contentContainerStyle={{ flex: 1, paddingBottom: bottom, gap: 15 }}
              style={styles.contentContainer}>
              <UserBasicInfo
                profileBasicForm={user.profileBasicForm}
                country={{
                  countryFlagImg: userCountry?.[0].flags?.png || unknownFlag,
                  countryId: user.countryId,
                  countryName: userCountry?.[0].name.common || user.countryId,
                }}
                isUserActive={isUserActive}
              />
              <UserQuestions rawQuestions={user.profileExtendedForm} />
              <UserPhotos photos={user.photos} width={width} />
              <UserInterests
                userName={user.profileBasicForm.fullName}
                interestsIds={user.interests}
              />
              <UserIdealMatch
                userName={user.profileBasicForm.fullName}
                idealMatchId={user.idealMatch}
              />
            </BottomSheetScrollView>
          )}
        </BottomSheet>
      </GestureHandlerRootView>
    </>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: { borderTopLeftRadius: 20, borderTopRightRadius: 20 },
  contentContainer: {
    padding: 20,
  },
});
