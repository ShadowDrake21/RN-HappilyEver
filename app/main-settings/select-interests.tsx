import MainButtonLink from '@components/ui/MainButtonLink';
import ParagraphText from '@components/ui/ParagraphText';
import { FlashList } from '@shopify/flash-list';
import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { List } from 'react-native-paper';

import { COLORS } from '~/constants/colors';
import { profileIterests } from '~/content/profile-interests.content';
import { useMainSettings } from '~/context/MainSettingsContext';
import { ProfileInterestsCategory, ProfileInterestsCompressed } from '~/types/main-settings.types';
import { toggleInterest } from '~/utils/helpers.utils';

const Page = () => {
  const { interests, setInterests } = useMainSettings();

  useEffect(() => {
    console.log('interestIds:', interests);
  }, [interests]);

  // const handleToggleInterest = (id: string) => {
  //   setInterestIds((prevIds) => {
  //     if (prevIds.includes(id)) {
  //       return prevIds.filter((i) => i !== id);
  //     } else {
  //       return [...prevIds, id];
  //     }
  //   });
  // };

  const handleToggleInterest = (newInterest: ProfileInterestsCompressed) => {
    setInterests((prev) => {
      const index = prev.findIndex((item) => item.categoryId === newInterest.categoryId);
      if (index === -1) {
        return [...prev, newInterest];
      } else {
        if (prev[index].interestIds.includes(newInterest.interestIds[0])) {
          const updatedInterests = [...prev];
          updatedInterests[index].interestIds = updatedInterests[index].interestIds.filter(
            (id) => id !== newInterest.interestIds[0]
          );
          if (updatedInterests[index].interestIds.length === 0) {
            updatedInterests.splice(index, 1);
          }
          return updatedInterests;
        } else {
          const updatedInterests = [...prev];
          updatedInterests[index].interestIds.push(newInterest.interestIds[0]);
          return updatedInterests;
        }
      }
    });
  };

  return (
    <View className="flex-1 gap-5">
      <ParagraphText style={{ paddingBottom: 0 }}>
        Choose your interests to connect with soulmates who share your values and are looking for a
        meaningful, long-term relationship and family life.
      </ParagraphText>
      <List.AccordionGroup>
        <FlashList
          data={profileIterests}
          estimatedItemSize={40}
          renderItem={({ item: { category, interests, id } }) => (
            <List.Accordion title={category} id={category}>
              {interests.map(({ id: interestId, title, description, icon }) => (
                <List.Item
                  key={title}
                  title={title}
                  description={description}
                  style={[
                    {
                      borderWidth: 1,
                      borderColor: COLORS.gray,
                      borderRadius: 10,
                      marginVertical: 5,
                      paddingHorizontal: 10,
                    },
                    // myInterests
                    //   .find((item) => item.category === category)
                    //   ?.interests.find((interest) => interest.title === title)
                    //   ? { backgroundColor: COLORS.extraDark }
                    //   : {},
                    // interestIds.includes(id) ? { backgroundColor: COLORS.extraDark } : {},
                  ]}
                  contentStyle={{
                    gap: 10,
                  }}
                  titleStyle={{ fontSize: 16, fontWeight: 'bold', color: COLORS.text }}
                  descriptionStyle={{ color: COLORS.grayish }}
                  left={() => <Text>{icon}</Text>}
                  onPress={() => {
                    handleToggleInterest({ categoryId: id, interestIds: [interestId] });
                  }}
                />
              ))}
            </List.Accordion>
          )}
          keyExtractor={(item) => item.category}
          showsVerticalScrollIndicator={false}
        />
      </List.AccordionGroup>
      <MainButtonLink href="./select-ideal-match">Continue</MainButtonLink>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({});
