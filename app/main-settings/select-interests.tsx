import ParagraphText from '@components/ui/ParagraphText';
import { FlashList } from '@shopify/flash-list';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Chip, List } from 'react-native-paper';

import { COLORS } from '~/constants/colors';
import { profileIterests } from '~/content/profile-interests.content';

const Page = () => {
  return (
    <View className="flex-1">
      <ParagraphText>
        Choose your interests to connect with soulmates who share your values and are looking for a
        meaningful, long-term relationship and family life.
      </ParagraphText>
      <List.AccordionGroup>
        <FlashList
          data={profileIterests}
          estimatedItemSize={40}
          renderItem={({ item: { category, interests } }) => (
            <List.Accordion title={category} id={category}>
              {interests.map(({ title, description, icon }) => (
                <List.Item
                  key={title}
                  title={title}
                  description={description}
                  style={{
                    borderWidth: 1,
                    borderColor: COLORS.gray,
                    borderRadius: 10,
                    marginVertical: 5,
                    paddingHorizontal: 10,
                  }}
                  contentStyle={{
                    gap: 10,
                  }}
                  titleStyle={{ fontSize: 16, fontWeight: 'bold', color: COLORS.text }}
                  descriptionStyle={{ color: COLORS.grayish }}
                  left={() => <Text>{icon}</Text>}
                  onPress={() => {
                    console.log('You have selected:', title);
                  }}
                />
              ))}
            </List.Accordion>
          )}
          keyExtractor={(item) => item.category}
          showsVerticalScrollIndicator={false}
        />
      </List.AccordionGroup>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({});
