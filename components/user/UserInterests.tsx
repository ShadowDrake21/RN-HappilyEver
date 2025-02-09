import SmallSectionTitle from '@components/ui/SmallSectionTitle';
import Subtitle from '@components/ui/Subtitle';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { List } from 'react-native-paper';

import { COLORS } from '~/constants/colors';
import useRetrieveInterests from '~/hooks/useRetrieveInterests';
import { ProfileInterestsIds } from '~/types/main-settings.types';

const UserInterests = ({
  userName,
  interestsIds,
}: {
  userName: string;
  interestsIds: ProfileInterestsIds[];
}) => {
  const categoryItems = useRetrieveInterests(interestsIds);

  return (
    <FlatList
      scrollEnabled={false}
      data={categoryItems}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.gap10}
      ListHeaderComponent={
        <SmallSectionTitle style={styles.pb0}>
          What {userName.split(' ')[0]} looks for in a relationship:
        </SmallSectionTitle>
      }
      renderItem={({ item }) => (
        <View>
          <Subtitle style={styles.pb0}>{item.category}</Subtitle>
          {item.interests.map((item) => (
            <List.Item
              key={item.title}
              title={item.title}
              description={item.description}
              style={styles.item}
              contentStyle={styles.gap10}
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
  pb0: { paddingBottom: 0 },
  gap10: { gap: 10 },
});
