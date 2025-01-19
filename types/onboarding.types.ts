import { ImageSourcePropType } from 'react-native';

export interface IOnboardingContent {
  image: ImageSourcePropType;
  text: string;
  nextText: string;
  isSkipAvailable?: boolean;
  nextRoute: string;
}
