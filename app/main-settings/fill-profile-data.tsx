import ProfileBasicForm from '@components/fill-profile-data/ProfileBasicForm';
import CustomBasicHeader from '@components/shared/CustomBasicHeader';
import TouchableKeyboardAvoidingView from '@components/shared/TouchableKeyboardAvoidingView';
import { Stack } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { COLORS } from '~/constants/colors';

const Page = () => {
  const { top } = useSafeAreaInsets();

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
      <TouchableKeyboardAvoidingView offset={top + 20}>
        <ProfileBasicForm />
      </TouchableKeyboardAvoidingView>
    </>
  );
};

export default Page;
