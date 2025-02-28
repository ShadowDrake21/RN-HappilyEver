import React from 'react';
import { View } from 'react-native';
import LoaderKit from 'react-native-loader-kit';

import { COLORS } from '~/constants/colors';

const ProfileSelectImageLoading = () => {
  return (
    <View className="absolute bottom-0 left-0 right-0 top-0 items-center justify-center">
      <LoaderKit name="BallPulseSync" style={{ width: 80, height: 80 }} color={COLORS.mainPurple} />
    </View>
  );
};

export default ProfileSelectImageLoading;
