import SmallSectionTitle from '@components/ui/SmallSectionTitle';
import React from 'react';
import { FlatList, StyleSheet } from 'react-native';

import UserInterestsItem from './UserInterestsItem';

import useHandleCategories from '~/hooks/handlers/useHandleCategories';
import { ProfileInterestsIds } from '~/types/main-settings.types';

const UserInterests = ({
  userName,
  interestsIds,
}: {
  userName: string;
  interestsIds: ProfileInterestsIds[];
}) => {
  const categoryItems = useHandleCategories(interestsIds);

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
      renderItem={({ item }) => <UserInterestsItem item={item} />}
    />
  );
};

export default UserInterests;

const styles = StyleSheet.create({
  pb0: { paddingBottom: 0 },
  gap10: { gap: 10 },
});
