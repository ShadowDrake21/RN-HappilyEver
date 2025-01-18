<<<<<<< HEAD
import { Stack, Link, Redirect, SplashScreen } from 'expo-router';
import React from 'react';
=======
import { Stack, Link } from 'expo-router';
>>>>>>> bd391e4 (Initial commit)

import { Button } from '~/components/Button';
import { Container } from '~/components/Container';
import { ScreenContent } from '~/components/ScreenContent';

<<<<<<< HEAD
// SplashScreen.preventAutoHideAsync();

export default function Home() {
  return <Redirect href="/onboarding" />;
=======
export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: 'Home' }} />
      <Container>
        <ScreenContent path="app/index.tsx" title="Home" />
        <Link href={{ pathname: '/details', params: { name: 'Dan' } }} asChild>
          <Button title="Show Details" />
        </Link>
      </Container>
    </>
  );
>>>>>>> bd391e4 (Initial commit)
}
