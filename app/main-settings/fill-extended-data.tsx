import TouchableKeyboardAvoidingView from '@components/shared/TouchableKeyboardAvoidingView';
import CustomTextArea from '@components/ui/CustomTextInput';
import MainButton from '@components/ui/MainButton';
import TextLink from '@components/ui/TextLink';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { Text as PaperText } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { COLORS } from '~/constants/colors';
import { IMainSettingsExtendedForm } from '~/types/main-settings.types';

const Page = () => {
  const { top, bottom } = useSafeAreaInsets();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IMainSettingsExtendedForm>({
    defaultValues: {
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
    <TouchableKeyboardAvoidingView offset={top + 40}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: bottom, gap: 15 }}>
          <View className="gap-5">
            <PaperText
              variant="headlineMedium"
              style={{ color: COLORS.grayish, fontWeight: 600, textAlign: 'center' }}>
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
              style={{ color: COLORS.grayish, fontWeight: 600, textAlign: 'center' }}>
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
                  height={150}
                  multiline
                  textAlignVertical="top"
                />
              )}
              name="loveRelationships.dealBreakers"
            />
            {errors.loveRelationships?.dealBreakers && (
              <Text style={styles.errorText}>{errors.loveRelationships.dealBreakers.message}</Text>
            )}
          </View>
          <View className="gap-5">
            <PaperText
              variant="headlineMedium"
              style={{ color: COLORS.grayish, fontWeight: 600, textAlign: 'center' }}>
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
                  height={150}
                  multiline
                  textAlignVertical="top"
                />
              )}
              name="familyFuture.childrenInFuture"
            />
            {errors.familyFuture?.childrenInFuture && (
              <Text style={styles.errorText}>{errors.familyFuture?.childrenInFuture.message}</Text>
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
              style={{ color: COLORS.grayish, fontWeight: 600, textAlign: 'center' }}>
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
          <MainButton onPress={handleSubmit(onSubmit)} disabled={!!errors}>
            Continue
          </MainButton>
        </ScrollView>
      </TouchableWithoutFeedback>
      <View className="grow flex-row justify-end">
        <TextLink href="./add-photos" classes="py-4">
          Skip for now
        </TextLink>
      </View>
    </TouchableKeyboardAvoidingView>
  );
};

export default Page;

const styles = StyleSheet.create({
  errorText: {
    color: 'red',
    marginTop: 4,
  },
});
