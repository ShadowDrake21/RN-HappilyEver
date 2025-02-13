import { useUser } from '@clerk/clerk-expo';
import React from 'react';
import { Image, View } from 'react-native';
import { Text as PaperText } from 'react-native-paper';

import { COLORS } from '~/constants/colors';

const HeaderContent = () => {
  const { user } = useUser();

  return (
    <View className="flex-row items-center gap-3">
      <Image
        source={{
          uri:
            user?.imageUrl ||
            'https://upload.wikimedia.org/wikipedia/commons/b/bc/Unknown_person.jpg',
        }}
        className="h-[50px] w-[50px] rounded-[25px]"
      />
      <View className="gap-2">
        <PaperText variant="titleSmall" style={{ color: COLORS.grayish }}>
          Let’s discover someone special!
        </PaperText>
        <PaperText variant="titleSmall" style={{ fontWeight: 'bold', color: COLORS.gray }}>
          {user?.fullName || user?.primaryEmailAddress?.emailAddress}
        </PaperText>
      </View>
    </View>
  );
};

export default HeaderContent;
