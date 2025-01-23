import BottomSheet from '@components/ui/BottomSheet';
import CustomInput from '@components/ui/CustomInput';
import MainButton from '@components/ui/MainButton';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { Stack } from 'expo-router';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import { Button, Icon } from 'react-native-paper';
import PhoneInput from 'react-native-phone-input';
import { useSharedValue } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SelectDropdown from 'react-native-select-dropdown';

import { COLORS } from '~/constants/colors';
import { useMainSettings } from '~/context/MainSettingsContext';
import { ICountry } from '~/types/country.types';
import { IMainSettingsForm } from '~/types/main-settings.types';
import { fetchCountries } from '~/utils/fetch.utils';

const genders = [
  { title: 'male', icon: 'gender-male' },
  { title: 'female', icon: 'gender-female' },
];

const Page = () => {
  const { bottom } = useSafeAreaInsets();
  const { countryId, setProfileForm } = useMainSettings();
  const isOpen = useSharedValue(false);

  const toggleSheet = () => {
    isOpen.value = !isOpen.value;
  };

  const collapseSheet = () => {
    isOpen.value = false;
  };

  const { data: countries, isLoading } = useQuery<ICountry[]>({
    queryFn: () =>
      fetchCountries('https://restcountries.com/v3.1/alpha/' + countryId, {
        params: { fields: 'name,flags,idd,cca2' },
      }),
    queryKey: ['countries'],
  });

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<IMainSettingsForm>({
    defaultValues: {
      fullName: '',
      username: '',
      gender: '',
      birthDate: undefined,
      phoneNumber: countries && countries[0].phoneCode,
      occupation: '',
    },
  });
  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <View style={{ flex: 1, paddingBottom: bottom }}>
      <Stack.Screen
        options={{
          contentStyle: {
            backgroundColor: COLORS.dark,
            paddingTop: 0,
            paddingHorizontal: 0,
            paddingBottom: 0,
          },
        }}
      />
      <View style={{ flex: 1, gap: 20 }}>
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
              addStyle={{ marginHorizontal: 20 }}
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
              addStyle={{ marginHorizontal: 20 }}
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
            required: 'Gender is required',
          }}
          render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
            <SelectDropdown
              data={genders}
              onSelect={(selectedItem, index) => {
                onChange(selectedItem.title);
              }}
              onBlur={onBlur}
              defaultValue={value}
              renderButton={(selectedItem: { title: string; icon: string }, isOpened) => {
                return (
                  <View style={styles.dropdownButtonStyle}>
                    {selectedItem && (
                      <Icon source={selectedItem.icon} color={COLORS.grayish} size={20} />
                    )}
                    <Text style={styles.dropdownButtonTxtStyle}>
                      {(selectedItem && selectedItem.title) || 'Select your gender'}
                    </Text>
                    <Icon
                      source={isOpened ? 'chevron-down' : 'chevron-up'}
                      color={COLORS.grayish}
                      size={20}
                    />
                  </View>
                );
              }}
              renderItem={(item: { title: string; icon: string }, index, isSelected) => {
                return (
                  <View
                    style={{
                      ...styles.dropdownItemStyle,
                      ...(isSelected && { backgroundColor: '#D2D9DF' }),
                    }}>
                    <Icon source={item.icon} color={COLORS.mainPurple} size={20} />
                    <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
                  </View>
                );
              }}
              showsVerticalScrollIndicator={false}
              dropdownStyle={styles.dropdownMenuStyle}
            />
          )}
          name="gender"
        />
        {errors.gender && <Text style={styles.errorText}>{errors.gender.message}</Text>}
        <Controller
          control={control}
          rules={{
            required: 'Username is required',
            minLength: { value: 3, message: 'Username should be at least 3 characters long' },
            maxLength: { value: 25, message: 'Username should be at most 25 characters long' },
          }}
          render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
            <>
              <TouchableOpacity style={styles.toggleButton} onPress={toggleSheet}>
                <Text style={styles.toggleButtonText}>
                  {value ? format(value, 'do MMMM yyyy') : 'Select your birthday'}
                </Text>
                <Icon source="calendar" color={COLORS.grayish} size={20} />
              </TouchableOpacity>
              <BottomSheet isOpen={isOpen} onPress={collapseSheet}>
                <CalendarPicker onDateChange={onChange} />
              </BottomSheet>
            </>
          )}
          name="birthDate"
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
            <View className="mx-6 flex-row items-center gap-5">
              <Image
                source={{ uri: countries && countries[0].flags.png }}
                className="h-16 w-20"
                resizeMode="contain"
              />
              <CustomInput
                errors={error}
                placeholder="Phone Number"
                addStyle={{ flex: 1 }}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                keyboardType="phone-pad"
              />
            </View>
          )}
          name="phoneNumber"
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
            <CustomInput
              errors={error}
              placeholder="Occupation"
              addStyle={{ marginHorizontal: 20 }}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="occupation"
        />
        {errors.username && <Text style={styles.errorText}>{errors.username.message}</Text>}
      </View>
      <View style={{ marginHorizontal: 20 }}>
        <MainButton onPress={handleSubmit(onSubmit)} disabled={!!errors}>
          Continue
        </MainButton>
      </View>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  errorText: {
    color: 'red',
    marginTop: 4,
  },
  dropdownButtonStyle: {
    marginHorizontal: 20,
    height: 50,
    backgroundColor: COLORS.extraDark,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: COLORS.text,
    textTransform: 'capitalize',
    textAlign: 'center',
  },
  dropdownButtonArrowStyle: {
    fontSize: 28,
  },
  dropdownButtonIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  dropdownMenuStyle: {
    backgroundColor: '#E9ECEF',
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 12,

    alignItems: 'center',
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#151E26',
    textTransform: 'capitalize',
    textAlign: 'center',
  },
  dropdownItemIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  toggleButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.extraDark,
    padding: 12,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    marginHorizontal: 20,
  },
  toggleButtonText: {
    padding: 8,
    fontSize: 18,
    fontWeight: '500',
    color: COLORS.text,
    textTransform: 'capitalize',
    textAlign: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});
