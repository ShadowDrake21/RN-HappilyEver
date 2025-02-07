import ActivityBadge from '@components/shared/ActivityBadge';
import CustomLoader from '@components/ui/CustomLoader';
import UserIdealMatch from '@components/user/UserIdealMatch';
import UserInterests from '@components/user/UserInterests';
import UserPhotos from '@components/user/UserPhotos';
import UserQuestions from '@components/user/UserQuestions';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { useQuery } from '@tanstack/react-query';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Image, ImageBackground, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { IconButton } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { COLORS } from '~/constants/colors';
import { mock_full_users } from '~/content/users.content';
import { ICountry } from '~/types/country.types';
import { IUserFullProfile } from '~/types/user.types';
import { fetchCountries } from '~/utils/fetch.utils';
import { getFullYears } from '~/utils/helpers.utils';

const Page = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [user, setUser] = useState<IUserFullProfile | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const { top } = useSafeAreaInsets();

  const bottomSheetRef = useRef<BottomSheet>(null);
  const isUserActive = true;
  const { width } = useWindowDimensions();

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
      <ImageBackground source={{ uri: user?.profileUrl }} resizeMode="cover" style={{ flex: 1 }}>
        <GestureHandlerRootView>
          <BottomSheet
            ref={bottomSheetRef}
            onClose={() => bottomSheetRef.current?.close()}
            snapPoints={['50%', '80%']}
            backgroundStyle={{ backgroundColor: COLORS.extraDark, borderRadius: 25 }}
            containerStyle={[styles.container, { marginTop: top }]}
            index={0}>
            {user && (
              <BottomSheetScrollView
                contentContainerStyle={{ flex: 1 }}
                style={styles.contentContainer}>
                <Text>{user?.profileBasicForm.fullName}</Text>
                <Text>{getFullYears(user?.profileBasicForm.birthDate)}</Text>
                <View>
                  <ActivityBadge isUserActive={isUserActive} />
                </View>
                <Text>{user?.profileBasicForm.occupation}</Text>
                <Text>{user?.profileBasicForm.gender}</Text>
                <Text>{user?.profileBasicForm.username}</Text>
                {userCountry && (
                  <Image
                    source={{ uri: userCountry[0].flags.png }}
                    style={{ width: 100, height: 75 }}
                  />
                )}
                <Text>{userCountry ? userCountry[0].name.common : user?.countryId}</Text>
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
      </ImageBackground>
    </>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: { borderTopLeftRadius: 20, borderTopRightRadius: 20 },
  contentContainer: {
    // flex: 1,
    padding: 20,
  },
  item: {
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: 10,
    marginVertical: 5,
    paddingHorizontal: 10,
  },
  itemTitle: { fontSize: 16, fontWeight: 'bold', color: COLORS.text },
});
