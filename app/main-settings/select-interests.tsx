import SelectInterestsAccordion from '@components/select-interests/SelectInterestsAccordion';
import SelectedInterestsList from '@components/select-interests/SelectedInterestsList';
import CustomBasicHeader from '@components/shared/CustomBasicHeader';
import ParagraphText from '@components/ui/ParagraphText';
import { FlashList } from '@shopify/flash-list';
import { useRouter } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
import { List } from 'react-native-paper';

import { profileInterests } from '~/content/profile-interests.content';
import { useMainSettings } from '~/context/MainSettingsContext';

const Page = () => {
  const router = useRouter();
  const { dispatch } = useMainSettings();

  return (
    <>
      <CustomBasicHeader
        title="Select Your Interests"
        onPressLeft={() => {
          dispatch({ type: 'SET_INTERESTS', payload: [] });
          router.back();
        }}
        onPressRight={() => router.push('/main-settings/select-ideal-match')}
      />
      <View className="flex-1 gap-5">
        <ParagraphText style={{ paddingBottom: 0 }}>
          Choose your interests to connect with soulmates who share your values and are looking for
          a meaningful, long-term relationship and family life.
        </ParagraphText>
        <List.AccordionGroup>
          <FlashList
            data={profileInterests}
            estimatedItemSize={40}
            renderItem={({ item }) => <SelectInterestsAccordion categoryItem={item} />}
            keyExtractor={(item) => item.category}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={<SelectedInterestsList />}
            ListHeaderComponentStyle={{ paddingBottom: 10 }}
          />
        </List.AccordionGroup>
      </View>
    </>
  );
};

export default Page;
