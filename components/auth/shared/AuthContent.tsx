import MediumTitle from '@components/ui/MediumTitle';
import React from 'react';
import { Image } from 'react-native';

const AuthContent = ({ title }: { title: string }) => {
  return (
    <>
      <Image
        source={require('assets/logo.png')}
        className="h-[200px] w-[200px] self-center"
        resizeMode="contain"
      />
      <MediumTitle>{title}</MediumTitle>
    </>
  );
};

export default AuthContent;
