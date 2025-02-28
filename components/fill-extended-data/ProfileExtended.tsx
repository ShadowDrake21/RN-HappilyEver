import TouchableKeyboardAvoidingView from '@components/shared/TouchableKeyboardAvoidingView';
import MainButton from '@components/ui/MainButton';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import ProfileExtendedForm from './ProfileExtendedForm';
import ProfileExtendedSkip from './ProfileExtendedSkip';

import useProfileExtendedForm from '~/hooks/forms/useProfileExtendedForm';

const ProfileExtended = () => {
  const { top, bottom } = useSafeAreaInsets();
  const { submit } = useProfileExtendedForm();
  const router = useRouter();

  const onSubmit = async () => {
    await submit();
    router.push('/main-settings/add-photos');
  };

  return (
    <TouchableKeyboardAvoidingView offset={top}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: bottom, gap: 15 }}>
        <ProfileExtendedForm />
      </ScrollView>
    </TouchableKeyboardAvoidingView>
  );
};

export default ProfileExtended;
