import { Stack, Link, Redirect, SplashScreen } from 'expo-router';
import React from 'react';

import { Button } from '~/components/Button';
import { Container } from '~/components/Container';
import { ScreenContent } from '~/components/ScreenContent';

// SplashScreen.preventAutoHideAsync();

export default function Home() {
  return <Redirect href="/onboarding" />;
}
