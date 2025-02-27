import OnboardingContent from '@components/shared/OnboardingContent';

import { onboardingItems } from '~/content/onboarding.content';

const Page = () => {
  return <OnboardingContent pageItem={onboardingItems[0]} />;
};

export default Page;
