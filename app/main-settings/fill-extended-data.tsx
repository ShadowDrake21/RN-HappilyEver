import ProfileExtendedForm from '@components/fill-extended-data/ProfileExtendedForm';
import TouchableKeyboardAvoidingView from '@components/shared/TouchableKeyboardAvoidingView';
import TextLink from '@components/ui/TextLink';
import React from 'react';
import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Page = () => {
  const { top, bottom } = useSafeAreaInsets();

  return (
    <>
      <TouchableKeyboardAvoidingView offset={top + 40}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: bottom, gap: 15 }}>
          <ProfileExtendedForm />
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
