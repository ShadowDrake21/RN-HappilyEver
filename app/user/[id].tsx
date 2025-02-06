import ProfileExtendedForm from '@components/fill-extended-data/ProfileExtendedForm';
import SelectInterestsAccordion from '@components/select-interests/SelectInterestsAccordion';
import CustomLoader from '@components/ui/CustomLoader';
import BottomSheet, { BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet';
import { useHeaderHeight } from '@react-navigation/elements';
import { FlashList } from '@shopify/flash-list';
import { useQuery } from '@tanstack/react-query';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { FlatList, Image, ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native';
import Gallery from 'react-native-awesome-gallery';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Chip, IconButton, List } from 'react-native-paper';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { COLORS } from '~/constants/colors';
import {
  familyFutureContent,
  lifeGoalsContent,
  loveRelationshipsContent,
  personalConnectionContent,
} from '~/content/profile-extended-form.content';
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
        {/* <View style={{ paddingTop: headerHeight, paddingBottom: bottom, flex: 1 }}> */}
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
                contentContainerStyle={{ flex: 1, backgroundColor: 'green' }}
                style={styles.contentContainer}>
                <Text>{user?.profileBasicForm.fullName}</Text>
                <Text>{getFullYears(user?.profileBasicForm.birthDate)}</Text>
                <View>
                  <Chip
                    icon={() =>
                      isUserActive ? (
                        <View
                          style={{
                            width: 10,
                            height: 10,
                            backgroundColor: 'green',
                            borderRadius: 50,
                          }}
                        />
                      ) : (
                        <View
                          style={{
                            width: 10,
                            height: 10,
                            backgroundColor: 'red',
                            borderRadius: 50,
                          }}
                        />
                      )
                    }
                    onPress={() => console.log('Pressed')}
                    style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
                    textStyle={{ color: 'white' }}>
                    {isUserActive ? 'Active' : 'Inactive'}
                  </Chip>
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

                <FlatList
                  data={user?.photos.map((photo) => photo.url)}
                  keyExtractor={(item) => item}
                  horizontal
                  renderItem={({ item }) => (
                    <Image source={{ uri: item }} style={{ height: 250, width: 200 }} />
                  )}
                />
                <List.AccordionGroup>
                  {user.interests.map((interest, index) => {
                    const selectedCategory = profileInterests.find(
                      (item) => item.id === interest.categoryId
                    )!;
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
                      <List.Accordion title={categoryItem.category} id={categoryItem.id}>
                        {categoryItem.interests.map((item) => (
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
                        ))}
                      </List.Accordion>
                    );
                  })}
                </List.AccordionGroup>
              </BottomSheetScrollView>
            )}
          </BottomSheet>
        </GestureHandlerRootView>
        {/* </View> */}
      </ImageBackground>

      {/* </SafeAreaView> */}
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
