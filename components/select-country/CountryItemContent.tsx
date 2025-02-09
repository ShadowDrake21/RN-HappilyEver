import React from 'react';
import { Image, View } from 'react-native';
import { Text as PaperText } from 'react-native-paper';

import { COLORS } from '~/constants/colors';
import { unknownFlag } from '~/constants/links';
import { ICountry } from '~/types/country.types';

const CountryItemContent = ({ country: { name, flags, phoneCode } }: { country: ICountry }) => {
  return (
    <View className="flex-row items-center gap-5">
      <Image
        source={{
          uri: flags.png ?? unknownFlag,
        }}
        alt={flags.alt}
        className="h-20 w-20 rounded-full"
        resizeMode="stretch"
      />
      <PaperText variant="labelLarge" style={{ color: COLORS.grayish }}>
        {phoneCode}
      </PaperText>
      <PaperText variant="labelLarge" style={{ color: COLORS.text }} numberOfLines={1}>
        {name.common}
      </PaperText>
    </View>
  );
};

export default CountryItemContent;
