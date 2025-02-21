import MediumTitle from '@components/ui/MediumTitle';
import sendCodeImg from 'assets/send-code.jpg';
import setPasswordImg from 'assets/set-password.jpg';
import verificateCodeImg from 'assets/verificate-code.jpg';
import React from 'react';
import { Image, useWindowDimensions } from 'react-native';

type ResetPasswordContentProps = {
  title: string;
  imageUrl: 'send-code' | 'verificate-code' | 'set-password';
};

const ResetPasswordContent = ({ title, imageUrl }: ResetPasswordContentProps) => {
  const { width } = useWindowDimensions();

  const image = {
    'send-code': sendCodeImg,
    'verificate-code': verificateCodeImg,
    'set-password': setPasswordImg,
  };

  return (
    <>
      <MediumTitle>{title}</MediumTitle>
      <Image
        source={image[imageUrl]}
        style={{
          aspectRatio: 1,
          width,
          height: width - 40,
        }}
        className="mb-5 self-center rounded-full"
        resizeMode="cover"
      />
    </>
  );
};

export default ResetPasswordContent;
