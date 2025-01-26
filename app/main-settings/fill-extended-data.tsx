import TouchableKeyboardAvoidingView from '@components/shared/TouchableKeyboardAvoidingView';
import CustomTextArea from '@components/ui/CustomTextInput';
import MainButton from '@components/ui/MainButton';
import MediumTitle from '@components/ui/MediumTitle';
import TextLink from '@components/ui/TextLink';
import React, { useEffect } from 'react';
import { Controller } from 'react-hook-form';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import useProfileExtendedForm from '~/hooks/useProfileExtendedForm';
import { ProfileExtendedField } from '~/types/main-settings.types';
import { getFormRule } from '~/utils/forms.utils';

const Page = () => {
  const { top, bottom } = useSafeAreaInsets();

  const { control, errors, submit } = useProfileExtendedForm();

  useEffect(() => {
    console.log('ProfileExtendedForm', Object.keys(control._formValues));
  }, []);

  const lifeGoalsContent: ProfileExtendedField[] = [
    {
      placeholder: 'What are your life goals?',
      name: 'lifeGoals.goals',
    },
    {
      placeholder: 'How do you envision your ideal lifestyle?',
      name: 'lifeGoals.idealLifestyle',
    },
  ];

  return (
    <>
      <TouchableKeyboardAvoidingView offset={top + 40}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: bottom, gap: 15 }}>
          <View>
            <MediumTitle>Life Goals</MediumTitle>
            <View className="gap-5">
              <Controller
                control={control}
                rules={{
                  minLength: {
                    value: 15,
                    message: getFormRule('minLength', 15),
                  },
                  maxLength: {
                    value: 256,
                    message: getFormRule('maxLength', 256),
                  },
                }}
                render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                  <CustomTextArea
                    errors={error}
                    placeholder="What are your life goals?"
                    height={150}
                    multiline
                    textAlignVertical="top"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
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
                    message: getFormRule('minLength', 15),
                  },
                  maxLength: {
                    value: 256,
                    message: getFormRule('maxLength', 256),
                  },
                }}
                render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                  <CustomTextArea
                    errors={error}
                    placeholder="How do you envision your ideal lifestyle?"
                    height={150}
                    multiline
                    textAlignVertical="top"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                  />
                )}
                name="lifeGoals.idealLifestyle"
              />
              {errors.lifeGoals?.idealLifestyle && (
                <Text style={styles.errorText}>{errors.lifeGoals.idealLifestyle.message}</Text>
              )}
            </View>
          </View>
          <View>
            <MediumTitle>Love & Relationships</MediumTitle>
            <View className="gap-5">
              <Controller
                control={control}
                rules={{
                  minLength: {
                    value: 15,
                    message: getFormRule('minLength', 15),
                  },
                  maxLength: {
                    value: 256,
                    message: getFormRule('maxLength', 256),
                  },
                }}
                render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                  <CustomTextArea
                    errors={error}
                    placeholder="What kind of relationship are you looking for?"
                    height={150}
                    multiline
                    textAlignVertical="top"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
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
                    message: getFormRule('minLength', 15),
                  },
                  maxLength: {
                    value: 256,
                    message: getFormRule('maxLength', 256),
                  },
                }}
                render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                  <CustomTextArea
                    errors={error}
                    placeholder="What values are most important to you in a partner?"
                    height={150}
                    multiline
                    textAlignVertical="top"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
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
                    message: getFormRule('minLength', 15),
                  },
                  maxLength: {
                    value: 256,
                    message: getFormRule('maxLength', 256),
                  },
                }}
                render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                  <CustomTextArea
                    errors={error}
                    placeholder="Are there any dealbreakers in a relationship for you?"
                    height={150}
                    multiline
                    textAlignVertical="top"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
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
          </View>
          <View>
            <MediumTitle>Family & Future</MediumTitle>
            <View className="gap-5">
              <Controller
                control={control}
                rules={{
                  minLength: {
                    value: 15,
                    message: getFormRule('minLength', 15),
                  },
                  maxLength: {
                    value: 256,
                    message: getFormRule('maxLength', 256),
                  },
                }}
                render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                  <CustomTextArea
                    errors={error}
                    placeholder="What is your perspective on marriage?"
                    height={150}
                    multiline
                    textAlignVertical="top"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
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
                    message: getFormRule('minLength', 15),
                  },
                  maxLength: {
                    value: 256,
                    message: getFormRule('maxLength', 256),
                  },
                }}
                render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                  <CustomTextArea
                    errors={error}
                    placeholder="Do you see children in your future? If so, how many?"
                    height={150}
                    multiline
                    textAlignVertical="top"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
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
                    message: getFormRule('minLength', 15),
                  },
                  maxLength: {
                    value: 256,
                    message: getFormRule('maxLength', 256),
                  },
                }}
                render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                  <CustomTextArea
                    errors={error}
                    placeholder="What kind of family life do you envision?"
                    height={150}
                    multiline
                    textAlignVertical="top"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                  />
                )}
                name="familyFuture.familyLife"
              />
              {errors.familyFuture?.familyLife && (
                <Text style={styles.errorText}>{errors.familyFuture?.familyLife.message}</Text>
              )}
            </View>
          </View>
          <View>
            <MediumTitle>Personal Connection</MediumTitle>
            <View className="gap-5">
              <Controller
                control={control}
                rules={{
                  minLength: {
                    value: 15,
                    message: getFormRule('minLength', 15),
                  },
                  maxLength: {
                    value: 256,
                    message: getFormRule('maxLength', 256),
                  },
                }}
                render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                  <CustomTextArea
                    errors={error}
                    placeholder="What shared interests or activities are important to you in a relationship?"
                    height={150}
                    multiline
                    textAlignVertical="top"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
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
                    message: getFormRule('minLength', 15),
                  },
                  maxLength: {
                    value: 256,
                    message: getFormRule('maxLength', 256),
                  },
                }}
                render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                  <CustomTextArea
                    errors={error}
                    placeholder="How do you approach emotional connection and communication in relationships?"
                    height={150}
                    multiline
                    textAlignVertical="top"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
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
          </View>
          <MainButton onPress={submit} disabled={!!errors}>
            Continue
          </MainButton>
        </ScrollView>
      </TouchableKeyboardAvoidingView>
      <View className="flex-row justify-end">
        <TextLink href="./add-photos" classes="py-4">
          Skip for now
        </TextLink>
      </View>
    </>
  );
};

export default Page;

const styles = StyleSheet.create({
  errorText: {
    color: 'red',
    marginTop: 4,
  },
});
