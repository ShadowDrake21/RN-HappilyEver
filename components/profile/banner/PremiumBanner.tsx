import React from 'react';
import { ImageBackground } from 'react-native';

import PremiumBannerContent from './PremiumBannerContent';

const PremiumBanner = () => {
  return (
    <ImageBackground
      source={require('assets/premium-bg.jpg')}
      className="w-full overflow-hidden rounded-[20px]"
      blurRadius={3}
      resizeMode="cover">
      <PremiumBannerContent />
    </ImageBackground>
  );
};

export default PremiumBanner;
