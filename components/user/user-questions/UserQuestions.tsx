import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Text as PaperText } from 'react-native-paper';

import UserQuestionsItem from './UserQuestionsItem';

import { COLORS } from '~/constants/colors';
import useHandleQuestions from '~/hooks/handlers/useHandleQuestions';
import { IUserQuestion } from '~/types/user.types';
import { formatCategory } from '~/utils/format.utils';

const UserQuestions = ({ rawQuestions }: { rawQuestions: IUserQuestion[] | undefined }) => {
  const groupedQuestions = useHandleQuestions(rawQuestions);

  return (
    <FlatList
      scrollEnabled={false}
      data={Object.keys(groupedQuestions)}
      style={{ flex: 1 }}
      contentContainerStyle={{ gap: 10, flex: 1 }}
      renderItem={({ item: category }) => (
        <View>
          <PaperText style={styles.categoryTitle}>{formatCategory(category)}:</PaperText>
          {groupedQuestions[category].map((question, index) => {
            console.log('userQuestions', question);

            return <UserQuestionsItem item={question} index={index} key={`${category}-${index}`} />;
          })}
        </View>
      )}
      keyExtractor={(item) => item}
    />
  );
};

export default UserQuestions;

const styles = StyleSheet.create({
  categoryTitle: {
    color: COLORS.text,
    textTransform: 'capitalize',
    fontWeight: '700',
    paddingBottom: 5,
  },
});
