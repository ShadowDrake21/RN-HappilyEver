import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { COLORS } from '~/constants/colors';
import { IUserQuestion } from '~/types/user.types';

const UserQuestionsItem = ({ item, index }: { item: IUserQuestion; index: number }) => {
  return (
    <View>
      <Text style={styles.question}>
        {index + 1}. {item.question}
      </Text>
      <Text style={styles.answer}>{item.answer}</Text>
    </View>
  );
};

export default UserQuestionsItem;

const styles = StyleSheet.create({
  question: { color: COLORS.text, fontWeight: '600' },
  answer: { color: COLORS.text },
});
