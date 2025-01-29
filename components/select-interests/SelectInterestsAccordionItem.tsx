import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { List } from 'react-native-paper';

import { COLORS } from '~/constants/colors';
import useInterests from '~/hooks/useInterests';
import { ProfileInterestItem } from '~/types/main-settings.types';

type SelectInterestsAccordionItemProps = {
  interest: ProfileInterestItem;
  categoryId: string;
};

const SelectInterestsAccordionItem = ({
  interest: { id: interestId, title, description, icon },
  categoryId,
}: SelectInterestsAccordionItemProps) => {
  const { handleToggleInterest } = useInterests();

  return (
    <List.Item
      key={title}
      title={title}
      description={description}
      style={styles.item}
      contentStyle={{
        gap: 10,
      }}
      titleStyle={styles.itemTitle}
      descriptionStyle={{ color: COLORS.grayish }}
      left={() => <Text>{icon}</Text>}
      onPress={() => handleToggleInterest({ categoryId, interestIds: [interestId] })}
    />
  );
};

export default SelectInterestsAccordionItem;

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
