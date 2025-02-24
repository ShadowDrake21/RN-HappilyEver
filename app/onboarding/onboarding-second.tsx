import React from 'react';

import OnboardingContent from '@components/shared/OnboardingContent';
import { onboardingItems } from '~/content/onboarding.content';

const Page = () => {
  return <OnboardingContent pageItem={onboardingItems[1]} />;
};

export default Page;
