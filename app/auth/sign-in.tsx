import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button, TextInput, Text as PaperText } from 'react-native-paper';

import { COLORS } from '~/constants/colors';

const Page = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [emailFocused, setEmailFocused] = useState(false);

  const onSubmit = (data: any) => console.log(data);

  return (
    <View>
      <Image
        source={require('assets/logo.png')}
        style={{ width: 200, height: 200, alignSelf: 'center' }}
        resizeMode="contain"
      />
      <PaperText
        variant="headlineMedium"
        style={{
          color: COLORS.text,
          fontFamily: 'Poppins-Regular',
          fontWeight: '600',
          textAlign: 'center',
          paddingBottom: 20,
        }}>
        Login to Your Account
      </PaperText>
      <View className="gap-6">
        <View>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[
                  { backgroundColor: COLORS.extraDark, borderWidth: 1, borderColor: 'transparent' },
                  errors.email && {
                    borderColor: COLORS.error,
                  },
                ]}
                contentStyle={{ color: COLORS.light }}
                placeholderTextColor={COLORS.lightDark}
                placeholder="Email"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                left={<TextInput.Icon icon="email" size={24} color={COLORS.grayish} />}
              />
            )}
            name="email"
          />
          {errors.email && <Text>Email is required.</Text>}
        </View>
        <View>
          <Controller
            control={control}
            rules={{
              minLength: 6,
              maxLength: 30,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[
                  { backgroundColor: COLORS.extraDark, borderWidth: 1, borderColor: 'transparent' },
                  errors.password && {
                    borderColor: COLORS.error,
                  },
                ]}
                contentStyle={{ color: COLORS.light }}
                placeholderTextColor={COLORS.lightDark}
                placeholder="Password"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                secureTextEntry={isPasswordHidden}
                left={<TextInput.Icon icon="lock" size={24} color={COLORS.grayish} />}
                right={
                  <TextInput.Icon
                    icon={isPasswordHidden ? 'eye' : 'eye-off'}
                    size={24}
                    color={COLORS.gray}
                    onPress={() => setIsPasswordHidden((prev) => !prev)}
                  />
                }
              />
            )}
            name="password"
          />
        </View>
        <Button
          mode="contained"
          onPress={handleSubmit(onSubmit)}
          disabled={Object.keys(errors).length > 0}>
          Submit
        </Button>
      </View>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({});
