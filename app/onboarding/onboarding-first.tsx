import OnboardingContent from '~/components/OnboardingContent';
import { onboardingItems } from '~/content/onboarding.content';

const Page = () => {
  return <OnboardingContent pageItem={onboardingItems[0]} />;
};

export default Page;
