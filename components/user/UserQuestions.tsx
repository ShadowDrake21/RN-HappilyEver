import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import {
  familyFutureContent,
  lifeGoalsContent,
  loveRelationshipsContent,
  personalConnectionContent,
} from '~/content/profile-extended-form.content';
import { IUserQuestion } from '~/types/user.types';

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
      data={questions}
      renderItem={({ item }) => (
        <View>
          <Text>{item.category}</Text>
          <Text>{item.question}</Text>
          <Text>{item.answer}</Text>
        </View>
      )}
      keyExtractor={(item) => item.question}
    />
  );
};

export default UserQuestions;

const styles = StyleSheet.create({});
