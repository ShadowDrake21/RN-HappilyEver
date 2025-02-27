import ProfileBasicForm from '@components/fill-profile-data/ProfileBasicForm';
import TouchableKeyboardAvoidingView from '@components/shared/TouchableKeyboardAvoidingView';
import { Stack } from 'expo-router';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { COLORS } from '~/constants/colors';

const Page = () => {
  return (
    <>
      <Stack.Screen
        options={{
          contentStyle: {
            paddingHorizontal: 0,
            backgroundColor: COLORS.dark,
          },
        }}
      />
      <TouchableKeyboardAvoidingView offset={20}>
        <ProfileBasicForm />
      </TouchableKeyboardAvoidingView>
    </>
  );
};

export default Page;
