import Subtitle from '@components/ui/Subtitle';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { List } from 'react-native-paper';

import { COLORS } from '~/constants/colors';
import { ProfileInterestsCategory } from '~/types/main-settings.types';

const UserInterestsItem = ({ item }: { item: ProfileInterestsCategory }) => {
  return (
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
  );
};

export default UserInterestsItem;

const styles = StyleSheet.create({
  pb0: { paddingBottom: 0 },
  gap10: { gap: 10 },
  item: {
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: 10,
    marginVertical: 5,
    paddingHorizontal: 10,
  },
  itemTitle: { fontSize: 16, fontWeight: 'bold', color: COLORS.text },
});
