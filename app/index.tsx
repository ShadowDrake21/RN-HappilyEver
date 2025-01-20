import { Stack, Link, Redirect, SplashScreen } from 'expo-router';
import React from 'react';

// SplashScreen.preventAutoHideAsync();

export default function Home() {
  return <Redirect href="./onboarding" />;
}
