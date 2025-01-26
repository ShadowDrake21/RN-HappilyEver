import CustomInput from '@components/ui/CustomInput';
import React from 'react';
import { Image, View } from 'react-native';
import { TextInputProps } from 'react-native-paper';

const PhoneInput = ({
  flag,
  errors,
  ...inputProps
}: {
  flag: string | undefined;
  errors: boolean;
} & TextInputProps) => {
  return (
    <View className="mx-6 flex-row items-center gap-5">
      {flag && <Image source={{ uri: flag }} className="h-16 w-20" resizeMode="contain" />}
      <CustomInput
        placeholder="Phone Number"
        addStyle={{ flex: 1 }}
        errors={errors}
        {...inputProps}
        keyboardType="phone-pad"
      />
    </View>
  );
};

export default PhoneInput;
