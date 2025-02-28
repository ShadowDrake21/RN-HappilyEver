import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import { View } from 'react-native';

import { COLORS } from '~/constants/colors';

const AddPhotoItemPlaceholder = () => {
  return (
    <View
      className="rounded-[50px] p-[15px]"
      style={{
        backgroundColor: COLORS.mainPurple,
      }}>
      <AntDesign
        name="plus"
        size={20}
        color="white"
        style={{
          display: 'flex',
          overflow: 'hidden',
        }}
      />
    </View>
  );
};

export default AddPhotoItemPlaceholder;
