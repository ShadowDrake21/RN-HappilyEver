import CustomTextArea from '@components/ui/CustomTextInput';
import ErrorMessage from '@components/ui/ErrorMessage';
import MediumTitle from '@components/ui/MediumTitle';
import React from 'react';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { View } from 'react-native';

import { IMainSettingsExtendedForm, ProfileExtendedField } from '~/types/main-settings.types';
import { getFormRule } from '~/utils/forms.utils';
import { getErrorMessage } from '~/utils/helpers.utils';

type ProfileExtendedFieldGroupProps = {
  control: Control<IMainSettingsExtendedForm, any>;
  errors: FieldErrors<IMainSettingsExtendedForm>;
  mainTitle: string;
  fields: ProfileExtendedField[];
};

const ProfileExtendedFormGroup = ({
  control,
  errors,
  mainTitle,
  fields,
}: ProfileExtendedFieldGroupProps) => (
  <View>
    <MediumTitle>{mainTitle}</MediumTitle>
    <View className="gap-5">
      {fields.map((field) => (
        <View key={field.name}>
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
                placeholder={field.placeholder}
                height={150}
                multiline
                textAlignVertical="top"
                value={typeof value === 'string' ? value : ''}
                onChangeText={onChange}
                onBlur={onBlur}
              />
            )}
            name={field.name as keyof IMainSettingsExtendedForm}
          />
          {getErrorMessage(errors, field.name) && (
            <ErrorMessage>{getErrorMessage(errors, field.name)}</ErrorMessage>
          )}
        </View>
      ))}
    </View>
  </View>
);

export default ProfileExtendedFormGroup;
