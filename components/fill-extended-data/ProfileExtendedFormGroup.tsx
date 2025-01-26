import CustomTextArea from '@components/ui/CustomTextInput';
import ErrorMessage from '@components/ui/ErrorMessage';
import MediumTitle from '@components/ui/MediumTitle';
import { FlashList } from '@shopify/flash-list';
import React from 'react';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { StyleSheet, Text, View } from 'react-native';

import { IMainSettingsExtendedForm, ProfileExtendedField } from '~/types/main-settings.types';
import { getFormRule } from '~/utils/forms.utils';

const ProfileExtendedFormGroup = ({
  control,
  errors,
  mainTitle,
  fields,
}: {
  control: Control<IMainSettingsExtendedForm, any>;
  errors: FieldErrors<IMainSettingsExtendedForm>;
  mainTitle: string;
  fields: ProfileExtendedField[];
}) => {
  return (
    <View>
      <MediumTitle>{mainTitle}</MediumTitle>
      <View className="gap-5">
        <FlashList
          data={fields}
          renderItem={({ item: { name, placeholder } }) => (
            <>
              <Controller
                key={name}
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
                    placeholder={placeholder}
                    height={150}
                    multiline
                    textAlignVertical="top"
                    value={typeof value === 'string' ? value : ''}
                    onChangeText={onChange}
                    onBlur={onBlur}
                  />
                )}
                name={name as keyof IMainSettingsExtendedForm}
              />
              {errors[name as keyof IMainSettingsExtendedForm] && (
                <ErrorMessage>
                  {errors[name as keyof IMainSettingsExtendedForm]?.message}
                </ErrorMessage>
              )}
            </>
          )}
        />
      </View>
    </View>
  );
};

export default ProfileExtendedFormGroup;

const styles = StyleSheet.create({});
