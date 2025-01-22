import React, { memo, useEffect } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Text as PaperText } from 'react-native-paper';

import { COLORS } from '~/constants/colors';
import { ICountry } from '~/types/country.types';

const CountryItem = ({
  country: { id, name, flags, phoneCode },
  onPress,
  isSelected,
}: {
  country: ICountry;
  onPress: (id: string) => void;
  isSelected: boolean;
}) => {
  return (
    <TouchableOpacity
      className="flex-row items-center justify-between gap-5 rounded-3xl p-5"
      style={{
        backgroundColor: COLORS.extraDark,
        borderWidth: 1,
        borderColor: isSelected ? COLORS.mainPurple : COLORS.slayish,
      }}
      onPress={() => onPress(id)}>
      <View className="flex-row items-center gap-5">
        <Image
          source={{
            uri:
              flags.png ??
              'https://upload.wikimedia.org/wikipedia/commons/2/2e/Unknown_flag_-_European_version.png',
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
      <View
        className="h-5 w-5 rounded-full border"
        style={[
          { borderColor: COLORS.mainPurple },
          isSelected && { backgroundColor: COLORS.mainPurple },
        ]}
      />
    </TouchableOpacity>
  );
};

export default memo(CountryItem);

const styles = StyleSheet.create({});
