import ProfileExtendedFormGroup from '@components/fill-extended-data/ProfileExtendedFormGroup';
import TouchableKeyboardAvoidingView from '@components/shared/TouchableKeyboardAvoidingView';
import MainButton from '@components/ui/MainButton';
import TextLink from '@components/ui/TextLink';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  familyFutureContent,
  lifeGoalsContent,
  loveRelationshipsContent,
  personalConnectionContent,
} from '~/content/profile-extended-form.content';
import useProfileExtendedForm from '~/hooks/useProfileExtendedForm';

const Page = () => {
  const { top, bottom } = useSafeAreaInsets();
  const { control, errors, submit } = useProfileExtendedForm();
  const router = useRouter();

  return (
    <>
      <TouchableKeyboardAvoidingView offset={top + 40}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: bottom, gap: 15 }}>
          <ProfileExtendedFormGroup
            control={control}
            errors={errors}
            fields={lifeGoalsContent}
            mainTitle="Life Goals"
          />
          <ProfileExtendedFormGroup
            control={control}
            errors={errors}
            fields={loveRelationshipsContent}
            mainTitle="Love & Relationships"
          />
          <ProfileExtendedFormGroup
            control={control}
            errors={errors}
            fields={familyFutureContent}
            mainTitle="Family & Future"
          />
          <ProfileExtendedFormGroup
            control={control}
            errors={errors}
            fields={personalConnectionContent}
            mainTitle="Personal Connection"
          />
          <MainButton
            onPress={() => {
              submit();
              router.push('/main-settings/add-photos');
            }}>
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
