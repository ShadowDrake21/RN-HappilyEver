import ConfirmationCodeField from '@components/confirmation-code-field/ConfirmationCodeField';
import TouchableKeyboardAvoidingView from '@components/shared/TouchableKeyboardAvoidingView';
import MainButton from '@components/ui/MainButton';
import MediumTitle from '@components/ui/MediumTitle';
import React from 'react';
import { Image, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type PendingVerificationProps = {
  code: string;
  setCode: React.Dispatch<React.SetStateAction<string>>;
  onVerification: () => void;
};

const PendingVerification = ({ code, setCode, onVerification }: PendingVerificationProps) => {
  const { bottom, top } = useSafeAreaInsets();
  const { width } = useWindowDimensions();

  return (
    <TouchableKeyboardAvoidingView offset={top + 100}>
      <View className="flex-1 justify-center gap-5" style={{ paddingBottom: bottom }}>
        <MediumTitle style={{ paddingBottom: 0 }}>Enter verification code</MediumTitle>
        <Image
          source={require('assets/auth/verification-code.jpg')}
          style={{
            aspectRatio: 1,
            width,
            height: width - 40,
            alignSelf: 'center',
            borderRadius: 200,
            marginBottom: 20,
          }}
          resizeMode="cover"
        />
        <ConfirmationCodeField cellCount={6} setValue={setCode} value={code} />
        <MainButton onPress={onVerification}>Verify</MainButton>
      </View>
    </TouchableKeyboardAvoidingView>
  );
};

export default PendingVerification;

const styles = StyleSheet.create({});
