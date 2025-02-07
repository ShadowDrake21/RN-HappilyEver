import ActivityBadge from '@components/shared/ActivityBadge';
import CustomLoader from '@components/ui/CustomLoader';
import SmallParagraphText from '@components/ui/SmallParagraphText';
import Subtitle from '@components/ui/Subtitle';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { useQuery } from '@tanstack/react-query';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { IconButton, List } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { COLORS } from '~/constants/colors';
import {
  familyFutureContent,
  lifeGoalsContent,
  loveRelationshipsContent,
  personalConnectionContent,
} from '~/content/profile-extended-form.content';
import { profileIdealMatch, profileIdealMatchIcons } from '~/content/profile-ideal-match.content';
import { profileInterests } from '~/content/profile-interests.content';
import { mock_full_users } from '~/content/users.content';
import { ICountry } from '~/types/country.types';
import { ProfileInterestsCategory } from '~/types/main-settings.types';
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

    console.log('fetchedUser', fetchedUser);

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [id]);

  if (loading) return <CustomLoader />;

  const printInterests = () => {
    if (!user) return;

    return user.interests.map((interest, index) => {
      const selectedCategory = profileInterests.find((item) => item.id === interest.categoryId)!;
      const selectedInterests = selectedCategory?.interests.filter((item) =>
        interest.interestIds.includes(item.id)
      )!;

      const categoryItem: ProfileInterestsCategory = {
        id: selectedCategory?.id,
        category: selectedCategory?.category,
        interests: selectedInterests,
      };
      console.log('interest', interest);

      return (
        <>
          <Text key={index}>{categoryItem.category}</Text>
          <FlatList
            scrollEnabled={false}
            data={categoryItem.interests}
            renderItem={({ item }) => (
              <List.Item
                key={item.title}
                title={item.title}
                description={item.description}
                style={styles.item}
                contentStyle={{
                  gap: 10,
                }}
                titleStyle={styles.itemTitle}
                descriptionStyle={{ color: COLORS.grayish }}
                left={() => <Text>{item.icon}</Text>}
              />
            )}
          />
        </>
      );
    });
  };

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
                {user?.profileExtendedForm!.map((item, index) => {
                  const content = [
                    ...lifeGoalsContent,
                    ...loveRelationshipsContent,
                    ...familyFutureContent,
                    ...personalConnectionContent,
                  ].find((content) => content.name === item.question);

                  return (
                    <>
                      <Text key={index}>{content?.placeholder}</Text>
                      <Text>{item.answer}</Text>
                    </>
                  );
                })}
                <View>
                  <FlatList
                    horizontal
                    data={user?.photos.map((photo) => photo.url)}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item}
                    renderItem={({ item }) => (
                      <Image
                        source={{ uri: item }}
                        style={{ height: 600, width: width - 80, borderRadius: 40 }}
                      />
                    )}
                  />
                  <View>
                    <Text>{user.photos.length} photos</Text>
                  </View>
                </View>
                <List.AccordionGroup>{printInterests()}</List.AccordionGroup>
                {profileIdealMatch
                  .filter((item) => item.id === user.idealMatch)
                  .map((item) => (
                    <View
                      className="flex-1 items-center justify-between gap-2 rounded-3xl border border-transparent p-4"
                      style={[{ backgroundColor: COLORS.extraDark }]}>
                      <Image
                        source={
                          profileIdealMatchIcons[item.id as keyof typeof profileIdealMatchIcons]
                        }
                        className="h-[100px] w-[100px]"
                      />
                      <Subtitle style={{ paddingBottom: 0 }}>{item.title}</Subtitle>
                      <SmallParagraphText style={{ textAlign: 'center' }}>
                        {item.description}
                      </SmallParagraphText>
                    </View>
                  ))}
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
