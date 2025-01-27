import ProfileBasicForm from '@components/fill-profile-data/ProfileBasicForm';
import TouchableKeyboardAvoidingView from '@components/shared/TouchableKeyboardAvoidingView';
import { Stack } from 'expo-router';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { COLORS } from '~/constants/colors';

const Page = () => {
  const { top } = useSafeAreaInsets();

  return (
    <>
      <Stack.Screen
        options={{
          contentStyle: {
            backgroundColor: COLORS.dark,
            paddingTop: 0,
            paddingHorizontal: 0,
            paddingBottom: 0,
          },
        }}
      />
      <TouchableKeyboardAvoidingView offset={top + 40}>
        <ProfileBasicForm />
      </TouchableKeyboardAvoidingView>
    </>
  );
};

export default Page;
