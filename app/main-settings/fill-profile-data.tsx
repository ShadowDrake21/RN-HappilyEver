import CustomInput from '@components/ui/CustomInput';
import MainButton from '@components/ui/MainButton';
import { yupResolver } from '@hookform/resolvers/yup';
import { Picker } from '@react-native-picker/picker';
import React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { StyleSheet, Text, View } from 'react-native';

const Page = () => {
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      birthDate: new Date(),
      fullName: '',
      gender: '',
      occupation: '',
      phoneNumber: '',
      username: '',
    },
  });
  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <View>
      <Controller
        control={control}
        rules={{
          required: 'Full Name is required',
          minLength: { value: 3, message: 'Name should be at least 3 characters long' },
          maxLength: { value: 40, message: 'Name should be at most 40 characters long' },
        }}
        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
          <CustomInput
            errors={error}
            placeholder="Full Name"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="fullName"
      />
      {errors.fullName && <Text style={styles.errorText}>{errors.fullName.message}</Text>}
      <Controller
        control={control}
        rules={{
          required: 'Username is required',
          minLength: { value: 3, message: 'Username should be at least 3 characters long' },
          maxLength: { value: 25, message: 'Username should be at most 25 characters long' },
        }}
        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
          <CustomInput
            errors={error}
            placeholder="Username"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="username"
      />
      {errors.username && <Text style={styles.errorText}>{errors.username.message}</Text>}
      <Controller
        control={control}
        rules={{
          required: 'Username is required',
          minLength: { value: 3, message: 'Username should be at least 3 characters long' },
          maxLength: { value: 25, message: 'Username should be at most 25 characters long' },
        }}
        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
          <Picker
            selectedValue={value}
            onValueChange={(itemValue, itemIndex) => onChange(itemValue)}>
            <Picker.Item label="Male" value="male" />
            <Picker.Item label="Female" value="female" />
          </Picker>
        )}
        name="gender"
      />
      {errors.username && <Text style={styles.errorText}>{errors.username.message}</Text>}
      <MainButton onPress={handleSubmit(onSubmit)}>Continue</MainButton>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  errorText: {
    color: 'red',
    marginTop: 4,
  },
});
