import ConfirmationCodeField from '@components/confirmation-code-field/ConfirmationCodeField';
import TouchableKeyboardAvoidingView from '@components/shared/TouchableKeyboardAvoidingView';
import MainButton from '@components/ui/MainButton';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import ResetPasswordContent from './ResetPasswordContent';

type VerificateCodeProps = {
  code: string;
  setCode: React.Dispatch<React.SetStateAction<string>>;
  onPress: () => void;
};

const VerificateCode = ({ code, setCode, onPress }: VerificateCodeProps) => {
  const { top } = useSafeAreaInsets();

  return (
    <TouchableKeyboardAvoidingView offset={top + 120}>
      <View className="w-full flex-1 justify-center gap-5">
        <ResetPasswordContent title="Enter verification code" imageUrl="verificate-code" />
        <ConfirmationCodeField cellCount={6} setValue={setCode} value={code} />
        <MainButton onPress={onPress}>Verify</MainButton>
      </View>
    </TouchableKeyboardAvoidingView>
  );
};

export default VerificateCode;

const styles = StyleSheet.create({});
