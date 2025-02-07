import MediumTitle from '@components/ui/MediumTitle';
import SmallSectionTitle from '@components/ui/SmallSectionTitle';
import Subtitle from '@components/ui/Subtitle';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { List } from 'react-native-paper';

import { COLORS } from '~/constants/colors';
import { profileInterests } from '~/content/profile-interests.content';
import { ProfileInterestsCategory, ProfileInterestsIds } from '~/types/main-settings.types';

const UserInterests = ({
  userName,
  interestsIds,
}: {
  userName: string;
  interestsIds: ProfileInterestsIds[];
}) => {
  const [categoryItems, setCategoryItems] = useState<ProfileInterestsCategory[]>([]);

  useEffect(() => {
    retrieveCategories();

    return () => {
      setCategoryItems([]);
    };
  }, []);

  const retrieveCategories = () => {
    interestsIds.forEach((interest) => {
      const selectedCategory = profileInterests.find((item) => item.id === interest.categoryId)!;
      const selectedInterests = selectedCategory?.interests.filter((item) =>
        interest.interestIds.includes(item.id)
      )!;

      setCategoryItems((prev) => [
        ...prev,
        {
          id: selectedCategory?.id,
          category: selectedCategory?.category,
          interests: selectedInterests,
        },
      ]);
    });
  };

  return (
    <FlatList
      scrollEnabled={false}
      data={categoryItems}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ gap: 10 }}
      ListHeaderComponent={
        <SmallSectionTitle style={{ paddingBottom: 0 }}>
          What {userName.split(' ')[0]} looks for in a relationship:
        </SmallSectionTitle>
      }
      renderItem={({ item }) => (
        <View>
          <Subtitle style={{ paddingBottom: 0 }}>{item.category}</Subtitle>
          {item.interests.map((item) => (
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
        </View>
      )}
    />
  );
};

export default UserInterests;

const styles = StyleSheet.create({
  item: {
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: 10,
    marginVertical: 5,
    paddingHorizontal: 10,
  },
  itemTitle: { fontSize: 16, fontWeight: 'bold', color: COLORS.text },
});
