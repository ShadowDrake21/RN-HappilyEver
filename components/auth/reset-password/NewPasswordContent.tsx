import MediumTitle from '@components/ui/MediumTitle';
import React from 'react';
import { Image, useWindowDimensions } from 'react-native';

const NewPasswordContent = () => {
  const { width } = useWindowDimensions();

  return (
    <>
      <MediumTitle>Set New Password</MediumTitle>
      <Image
        source={require('assets/set-password.jpg')}
        style={{
          aspectRatio: 1,
          width,
          height: width - 40,
          alignSelf: 'center',
          marginBottom: 20,
        }}
        className=" rounded-full"
        resizeMode="cover"
      />
    </>
  );
};

export default NewPasswordContent;
