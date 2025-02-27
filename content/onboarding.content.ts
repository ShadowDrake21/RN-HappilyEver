import image1 from 'assets/onboarding/onboarding-1.png';
import image2 from 'assets/onboarding/onboarding-2.png';
import image3 from 'assets/onboarding/onboarding-3.png';

import { IOnboardingContent } from '~/types/onboarding.types';

export const onboardingItems: IOnboardingContent[] = [
  {
    image: image1,
    text: 'Discover meaningful connections. Your love journey starts here.',
    isSkipAvailable: true,
    nextText: 'Next',
    nextRoute: './onboarding-second',
  },
  {
    image: image2,
    text: 'Chat and connect deeply. Build lasting bonds.',
    isSkipAvailable: true,
    nextText: 'Next',
    nextRoute: './onboarding-third',
  },
  {
    image: image3,
    text: 'Turn conversations into lasting love. Your future begins now.',
    isSkipAvailable: false,
    nextText: 'Begin your journey to relationships',
    nextRoute: '/auth',
  },
];
