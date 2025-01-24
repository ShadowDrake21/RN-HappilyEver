import BottomSheet from '@components/ui/BottomSheet';
import CustomInput from '@components/ui/CustomInput';
import CustomTextArea from '@components/ui/CustomTextInput';
import MainButton from '@components/ui/MainButton';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { Stack } from 'expo-router';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import { Button, Icon, Text as PaperText } from 'react-native-paper';
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
    setValue,
    formState: { errors },
  } = useForm<IMainSettingsForm>({
    defaultValues: {
      basics: {
        fullName: '',
        username: '',
        gender: '',
        birthDate: undefined,
        phoneNumber: '',
        occupation: '',
      },
      lifeGoals: {
        goals: '',
        idealLifestyle: '',
      },
      loveRelationships: {
        relationshipType: '',
        valuesInPartner: '',
        dealBreakers: '',
      },
      familyFuture: {
        marriagePerspective: '',
        childrenInFuture: '',
        familyLife: '',
      },
      personalConnection: {
        sharedInterests: '',
        emotionalConnection: '',
      },
    },
  });
  const onSubmit = (data: any) => {
    console.log(data);
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
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingBottom: bottom }}
        style={{ paddingBottom: bottom, flex: 1 }}
        keyboardShouldPersistTaps="handled">
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={100}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{ flex: 1 }}>
            <View style={{ flex: 1, gap: 20, paddingTop: 20 }}>
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
                name="basics.fullName"
              />
              {errors.basics?.fullName && (
                <Text style={styles.errorText}>{errors.basics?.fullName.message}</Text>
              )}

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
                    addStyle={{ marginHorizontal: 20 }}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
                name="basics.username"
              />
              {errors.basics?.username && (
                <Text style={styles.errorText}>{errors.basics.username.message}</Text>
              )}
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
                name="basics.gender"
              />
              {errors.basics?.gender && (
                <Text style={styles.errorText}>{errors.basics.gender.message}</Text>
              )}
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
                name="basics.birthDate"
              />
              {errors.basics?.birthDate && (
                <Text style={styles.errorText}>{errors.basics.birthDate.message}</Text>
              )}
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
                        if (getValues('basics.phoneNumber').length === 0) {
                          setValue('basics.phoneNumber', countries![0].phoneCode);
                        }
                      }}
                      keyboardType="phone-pad"
                    />
                  </View>
                )}
                name="basics.phoneNumber"
              />
              {errors.basics?.phoneNumber && (
                <Text style={styles.errorText}>{errors.basics?.phoneNumber.message}</Text>
              )}
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
                name="basics.occupation"
              />
              {errors.basics?.occupation && (
                <Text style={styles.errorText}>{errors.basics?.occupation.message}</Text>
              )}
              <View className="gap-5">
                <PaperText
                  variant="headlineMedium"
                  style={{ color: COLORS.grayish, fontWeight: 600 }}>
                  Life Goals
                </PaperText>
                <Controller
                  control={control}
                  rules={{
                    minLength: {
                      value: 15,
                      message: 'Life goals should be at least 15 characters long',
                    },
                    maxLength: {
                      value: 256,
                      message: 'Life goals should be at most 256 characters long',
                    },
                  }}
                  render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                    <CustomTextArea
                      errors={error}
                      placeholder="What are your life goals?"
                      addStyle={{ marginHorizontal: 20 }}
                      height={150}
                      multiline
                      textAlignVertical="top"
                    />
                  )}
                  name="lifeGoals.goals"
                />
                {errors.lifeGoals?.goals && (
                  <Text style={styles.errorText}>{errors.lifeGoals.goals.message}</Text>
                )}
                <Controller
                  control={control}
                  rules={{
                    minLength: {
                      value: 15,
                      message: 'Ideal lifestyle should be at least 15 characters long',
                    },
                    maxLength: {
                      value: 256,
                      message: 'Ideal lifestyle should be at most 256 characters long',
                    },
                  }}
                  render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                    <CustomTextArea
                      errors={error}
                      placeholder="How do you envision your ideal lifestyle?"
                      addStyle={{ marginHorizontal: 20 }}
                      height={150}
                      multiline
                      textAlignVertical="top"
                    />
                  )}
                  name="lifeGoals.idealLifestyle"
                />
                {errors.lifeGoals?.idealLifestyle && (
                  <Text style={styles.errorText}>{errors.lifeGoals.idealLifestyle.message}</Text>
                )}
              </View>
              <View className="gap-5">
                <PaperText
                  variant="headlineMedium"
                  style={{ color: COLORS.grayish, fontWeight: 600 }}>
                  Love & Relationships
                </PaperText>
                <Controller
                  control={control}
                  rules={{
                    minLength: {
                      value: 15,
                      message: 'Relationship type should be at least 15 characters long',
                    },
                    maxLength: {
                      value: 256,
                      message: 'Relationship type should be at most 256 characters long',
                    },
                  }}
                  render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                    <CustomTextArea
                      errors={error}
                      placeholder="What kind of relationship are you looking for?"
                      addStyle={{ marginHorizontal: 20 }}
                      height={150}
                      multiline
                      textAlignVertical="top"
                    />
                  )}
                  name="loveRelationships.relationshipType"
                />
                {errors.loveRelationships?.relationshipType && (
                  <Text style={styles.errorText}>
                    {errors.loveRelationships.relationshipType.message}
                  </Text>
                )}
                <Controller
                  control={control}
                  rules={{
                    minLength: {
                      value: 15,
                      message: 'Values in partner should be at least 15 characters long',
                    },
                    maxLength: {
                      value: 256,
                      message: 'Values in partner should be at most 256 characters long',
                    },
                  }}
                  render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                    <CustomTextArea
                      errors={error}
                      placeholder="What values are most important to you in a partner?"
                      addStyle={{ marginHorizontal: 20 }}
                      height={150}
                      multiline
                      textAlignVertical="top"
                    />
                  )}
                  name="loveRelationships.valuesInPartner"
                />
                {errors.loveRelationships?.valuesInPartner && (
                  <Text style={styles.errorText}>
                    {errors.loveRelationships.valuesInPartner.message}
                  </Text>
                )}
                <Controller
                  control={control}
                  rules={{
                    minLength: {
                      value: 15,
                      message: 'Deal breakers should be at least 15 characters long',
                    },
                    maxLength: {
                      value: 256,
                      message: 'Deal breakers should be at most 256 characters long',
                    },
                  }}
                  render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                    <CustomTextArea
                      errors={error}
                      placeholder="Are there any dealbreakers in a relationship for you?"
                      addStyle={{ marginHorizontal: 20 }}
                      height={150}
                      multiline
                      textAlignVertical="top"
                    />
                  )}
                  name="loveRelationships.dealBreakers"
                />
                {errors.loveRelationships?.dealBreakers && (
                  <Text style={styles.errorText}>
                    {errors.loveRelationships.dealBreakers.message}
                  </Text>
                )}
              </View>
              <View className="gap-5">
                <PaperText
                  variant="headlineMedium"
                  style={{ color: COLORS.grayish, fontWeight: 600 }}>
                  Family & Future
                </PaperText>
                <Controller
                  control={control}
                  rules={{
                    minLength: {
                      value: 15,
                      message: 'Marriage perspective should be at least 15 characters long',
                    },
                    maxLength: {
                      value: 256,
                      message: 'Marriage perspective should be at most 256 characters long',
                    },
                  }}
                  render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                    <CustomTextArea
                      errors={error}
                      placeholder="What is your perspective on marriage?"
                      addStyle={{ marginHorizontal: 20 }}
                      height={150}
                      multiline
                      textAlignVertical="top"
                    />
                  )}
                  name="familyFuture.marriagePerspective"
                />
                {errors.familyFuture?.marriagePerspective && (
                  <Text style={styles.errorText}>
                    {errors.familyFuture.marriagePerspective.message}
                  </Text>
                )}
                <Controller
                  control={control}
                  rules={{
                    minLength: {
                      value: 15,
                      message: 'Children in future should be at least 15 characters long',
                    },
                    maxLength: {
                      value: 256,
                      message: 'Children in future should be at most 256 characters long',
                    },
                  }}
                  render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                    <CustomTextArea
                      errors={error}
                      placeholder="Do you see children in your future? If so, how many?"
                      addStyle={{ marginHorizontal: 20 }}
                      height={150}
                      multiline
                      textAlignVertical="top"
                    />
                  )}
                  name="familyFuture.childrenInFuture"
                />
                {errors.familyFuture?.childrenInFuture && (
                  <Text style={styles.errorText}>
                    {errors.familyFuture?.childrenInFuture.message}
                  </Text>
                )}
                <Controller
                  control={control}
                  rules={{
                    minLength: {
                      value: 15,
                      message: 'Family life should be at least 15 characters long',
                    },
                    maxLength: {
                      value: 256,
                      message: 'Family life future should be at most 256 characters long',
                    },
                  }}
                  render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                    <CustomTextArea
                      errors={error}
                      placeholder="What kind of family life do you envision?"
                      addStyle={{ marginHorizontal: 20 }}
                      height={150}
                      multiline
                      textAlignVertical="top"
                    />
                  )}
                  name="familyFuture.familyLife"
                />
                {errors.familyFuture?.familyLife && (
                  <Text style={styles.errorText}>{errors.familyFuture?.familyLife.message}</Text>
                )}
              </View>
              <View className="gap-5">
                <PaperText
                  variant="headlineMedium"
                  style={{ color: COLORS.grayish, fontWeight: 600 }}>
                  Personal Connection
                </PaperText>
                <Controller
                  control={control}
                  rules={{
                    minLength: {
                      value: 15,
                      message: 'Shared interests should be at least 15 characters long',
                    },
                    maxLength: {
                      value: 256,
                      message: 'Shared interests future should be at most 256 characters long',
                    },
                  }}
                  render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                    <CustomTextArea
                      errors={error}
                      placeholder="What shared interests or activities are important to you in a relationship?"
                      addStyle={{ marginHorizontal: 20 }}
                      height={150}
                      multiline
                      textAlignVertical="top"
                    />
                  )}
                  name="personalConnection.sharedInterests"
                />
                {errors.personalConnection?.sharedInterests && (
                  <Text style={styles.errorText}>
                    {errors.personalConnection.sharedInterests.message}
                  </Text>
                )}
                <Controller
                  control={control}
                  rules={{
                    minLength: {
                      value: 15,
                      message: 'Emotional connection should be at least 15 characters long',
                    },
                    maxLength: {
                      value: 256,
                      message: 'Emotional connection future should be at most 256 characters long',
                    },
                  }}
                  render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                    <CustomTextArea
                      errors={error}
                      placeholder="How do you approach emotional connection and communication in relationships?"
                      addStyle={{ marginHorizontal: 20 }}
                      height={150}
                      multiline
                      textAlignVertical="top"
                    />
                  )}
                  name="personalConnection.emotionalConnection"
                />
                {errors.personalConnection?.emotionalConnection && (
                  <Text style={styles.errorText}>
                    {errors.personalConnection.emotionalConnection.message}
                  </Text>
                )}
              </View>
              <View style={{ marginHorizontal: 20 }}>
                <MainButton onPress={handleSubmit(onSubmit)} disabled={!!errors}>
                  Continue
                </MainButton>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </ScrollView>
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
