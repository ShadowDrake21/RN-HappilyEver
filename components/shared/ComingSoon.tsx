import React from 'react';
import { Image, useWindowDimensions, View } from 'react-native';
import { Text as PaperText } from 'react-native-paper';

import { COLORS } from '~/constants/colors';

const ComingSoon = () => {
  const { width } = useWindowDimensions();
  return (
    <View style={[{ flex: 1, paddingHorizontal: 20, justifyContent: 'center', gap: 20 }]}>
      <View className="flex flex-col items-center justify-center ">
        <PaperText variant="headlineLarge" style={{ fontWeight: 700, color: COLORS.text }}>
          Coming Soon 🚀
        </PaperText>
        <PaperText variant="headlineSmall" style={{ fontWeight: 500, color: COLORS.text }}>
          Stay tuned for updates.
        </PaperText>
      </View>
      <Image
        source={require('assets/coming soon.jpg')}
        resizeMode="cover"
        style={{ width: width - 40, height: width - 40, borderRadius: 20 }}
      />
    </View>
  );
};

export default ComingSoon;
