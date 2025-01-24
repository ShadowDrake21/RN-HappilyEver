import TouchableKeyboardAvoidingView from '@components/shared/TouchableKeyboardAvoidingView';
import BottomSheet from '@components/ui/BottomSheet';
import CustomInput from '@components/ui/CustomInput';
import MainButton from '@components/ui/MainButton';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { Stack } from 'expo-router';
import React from 'react';
import { Controller, RegisterOptions, useForm } from 'react-hook-form';
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import { Icon } from 'react-native-paper';
import { useSharedValue } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SelectDropdown from 'react-native-select-dropdown';

import { COLORS } from '~/constants/colors';
import { useMainSettings } from '~/context/MainSettingsContext';
import { ICountry } from '~/types/country.types';
import { IMainSettingsBasicForm } from '~/types/main-settings.types';
import { fetchCountries } from '~/utils/fetch.utils';

const genders = [
  { title: 'male', icon: 'gender-male' },
  { title: 'female', icon: 'gender-female' },
];

const Page = () => {
  const { top, bottom } = useSafeAreaInsets();
  const { countryId, setProfileBasicForm } = useMainSettings();
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
    setValue,
    formState: { errors },
  } = useForm<IMainSettingsBasicForm>({
    defaultValues: {
      fullName: '',
      username: '',
      gender: '',
      birthDate: undefined,
      phoneNumber: '',
      occupation: '',
    },
  });
  const onSubmit = (data: any) => {
    console.log(data);
  };

  const getRule = (type: 'required' | 'minLength' | 'maxLength', value?: number) => {
    if (type === 'required') {
      return 'Value is required';
    } else if (type === 'minLength') {
      return `Value should be at least ${value}`;
    } else if (type === 'maxLength') {
      return `Value should be at most ${value}`;
    }
    return '';
  };

  return (
    <>
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
      <TouchableKeyboardAvoidingView offset={top + 40}>
        <View className="flex-1 gap-[15] pt-5">
          <View className="mx-5 flex-row gap-5">
            <Controller
              control={control}
              rules={{
                required: getRule('required'),
                minLength: { value: 3, message: getRule('minLength', 3) },
                maxLength: { value: 40, message: getRule('maxLength', 40) },
              }}
              render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                <CustomInput
                  errors={error}
                  placeholder="Full Name"
                  addStyle={{ flex: 1 }}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="fullName"
            />

            <Controller
              control={control}
              rules={{
                required: 'Username is required',
                minLength: { value: 3, message: 'Username should be at least 3 characters long' },
                maxLength: {
                  value: 25,
                  message: 'Username should be at most 25 characters long',
                },
              }}
              render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                <CustomInput
                  errors={error}
                  placeholder="Username"
                  addStyle={{ flex: 1 }}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="username"
            />
          </View>
          <View className="flex-row gap-5">
            {errors.username && <Text style={styles.errorText}>{errors.fullName?.message}</Text>}
            {errors.username && <Text style={styles.errorText}>{errors.username.message}</Text>}
          </View>
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
              required: 'Birth day is required',
            }}
            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
              <>
                <TouchableOpacity style={styles.toggleButton} onPress={toggleSheet}>
                  <Text style={styles.toggleButtonText}>
                    {value ? format(value, 'do MMMM yyyy') : 'Select your birth day'}
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
          {errors.birthDate && <Text style={styles.errorText}>{errors.birthDate.message}</Text>}
          <Controller
            control={control}
            rules={{
              required: 'Phone number is required',
              pattern: {
                value: /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/,
                message: 'Invalid phone number format',
              },
              minLength: {
                value: 10,
                message: 'Phone number must be at least 10 digits',
              },
              maxLength: {
                value: 15,
                message: 'Phone number must not exceed 15 digits',
              },
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
                  onFocus={() => {
                    if (getValues('phoneNumber').length === 0) {
                      setValue('phoneNumber', countries![0].phoneCode);
                    }
                  }}
                  keyboardType="phone-pad"
                />
              </View>
            )}
            name="phoneNumber"
          />
          {errors.phoneNumber && <Text style={styles.errorText}>{errors.phoneNumber.message}</Text>}
          <Controller
            control={control}
            rules={{
              required: 'Occupation is required',
              minLength: {
                value: 6,
                message: 'Occupation should be at least 6 characters long',
              },
              maxLength: {
                value: 30,
                message: 'Occupation should be at most 30 characters long',
              },
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
          {errors.occupation && <Text style={styles.errorText}>{errors.occupation.message}</Text>}
          <View style={{ marginHorizontal: 20 }}>
            <MainButton onPress={handleSubmit(onSubmit)}>Continue</MainButton>
          </View>
        </View>
      </TouchableKeyboardAvoidingView>
    </>
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
