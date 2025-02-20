import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { profileQuestionsContent } from '~/content/other.content';
import { IUserQuestion } from '~/types/user.types';

type GroupedQuestionsType = { [key: string]: IUserQuestion[] };

const useHandleQuestions = (rawQuestions: IUserQuestion[] | undefined) => {
  const [groupedQuestions, setGroupedQuestions] = useState<GroupedQuestionsType>({});

  useEffect(() => {
    setGroupedQuestions(handleQuestions());
  }, [rawQuestions]);

  const handleQuestions = () => {
    if (!rawQuestions) return {};

    const grouped: GroupedQuestionsType = {};

    rawQuestions.map((item) => {
      const question = profileQuestionsContent.find((question) => question.name === item.question);

      const formattedQuestion = {
        category: item.category,
        question: question?.placeholder || '',
        answer: item.answer,
      };

      if (!grouped[item.category]) {
        grouped[item.category] = [];
      }
      grouped[item.category].push(formattedQuestion);
    });
    return grouped;
  };

  return groupedQuestions;
};

export default useHandleQuestions;
