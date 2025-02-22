import SmallDisplayTitle from '@components/ui/SmallDisplayTitle';
import React from 'react';
import { Image } from 'react-native';

const MainContent = () => {
  return (
    <>
      <Image
        source={require('assets/auth/image.png')}
        style={{ width: '100%', height: 300 }}
        resizeMode="contain"
      />
      <SmallDisplayTitle addStyle={{ paddingVertical: 20 }}>Let's you in</SmallDisplayTitle>
    </>
  );
};

export default MainContent;
