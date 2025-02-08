import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import { COLORS } from '~/constants/colors';
import {
  familyFutureContent,
  lifeGoalsContent,
  loveRelationshipsContent,
  personalConnectionContent,
} from '~/content/profile-extended-form.content';
import { IUserQuestion } from '~/types/user.types';
import { formatCategory } from '~/utils/format.utils';

const questionsContent = [
  ...lifeGoalsContent,
  ...loveRelationshipsContent,
  ...familyFutureContent,
  ...personalConnectionContent,
];

// TODO: Refactor this component (add questions based on their category)
const UserQuestions = ({ rawQuestions }: { rawQuestions: IUserQuestion[] | undefined }) => {
  const [questions, setQuestions] = useState<IUserQuestion[]>([]);

  useEffect(() => {
    setQuestions(retrieveQuestions());
  }, [rawQuestions]);

  const retrieveQuestions = () => {
    if (!rawQuestions) return [];

    return rawQuestions.map((item) => {
      const question = questionsContent.find((question) => question.name === item.question);

      return {
        category: item.category,
        question: question?.placeholder || '',
        answer: item.answer,
      };
    }) as IUserQuestion[];
  };

  return (
    <FlatList
      scrollEnabled={false}
      data={questions}
      contentContainerStyle={{ gap: 10 }}
      renderItem={({ item, index }) => (
        <View>
          <Text style={{ color: COLORS.text, textTransform: 'capitalize', fontWeight: '700' }}>
            {formatCategory(item.category)}:
          </Text>
          <Text style={{ color: COLORS.text, fontWeight: '600' }}>
            {index + 1}. {item.question}
          </Text>
          <Text style={{ color: COLORS.text }}>{item.answer}</Text>
        </View>
      )}
      keyExtractor={(item) => item.question}
    />
  );
};

export default UserQuestions;

const styles = StyleSheet.create({});
