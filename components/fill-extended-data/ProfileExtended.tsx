import TouchableKeyboardAvoidingView from '@components/shared/TouchableKeyboardAvoidingView';
import React from 'react';
import { ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import ProfileExtendedForm from './ProfileExtendedForm';

const ProfileExtended = () => {
  const { top, bottom } = useSafeAreaInsets();

  // error handling
  return (
    <TouchableKeyboardAvoidingView offset={top + 40}>
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
