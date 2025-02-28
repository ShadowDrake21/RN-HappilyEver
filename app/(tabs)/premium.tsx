import ComingSoon from '@components/shared/ComingSoon';
import { Stack } from 'expo-router';
import React from 'react';

const Page = () => {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ComingSoon />
    </>
  );
};

export default Page;
