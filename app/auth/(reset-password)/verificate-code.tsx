import { useSignIn } from '@clerk/clerk-expo';
import ConfirmationCodeField from '@components/confirmation-code-field/ConfirmationCodeField';
import TouchableKeyboardAvoidingView from '@components/shared/TouchableKeyboardAvoidingView';
import MediumTitle from '@components/ui/MediumTitle';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Text, View, Image, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import AuthForm from '~/components/auth/AuthForm';
import SignInSocials from '~/components/auth/AuthSocials';
import MainButton from '~/components/ui/MainButton';
import TextLink from '~/components/ui/TextLink';
import { COLORS } from '~/constants/colors';

const Page = () => {
  const router = useRouter();
  const { top, bottom } = useSafeAreaInsets();
  const [code, setCode] = useState('');
  const { width } = useWindowDimensions();
  const { signIn } = useSignIn();

  const verificate = async () => {
    router.push({ pathname: '/auth/(reset-password)/create-new-password', params: { code } });
  };

  return (
    <View className="flex-1 justify-between" style={{ paddingBottom: bottom }}>
      <TouchableKeyboardAvoidingView offset={top + 120}>
        <View className="w-full flex-1 justify-center gap-5">
          <MediumTitle style={{ paddingBottom: 0 }}>Enter verification code</MediumTitle>
          <Image
            source={require('assets/verificate-code.jpg')}
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
          <MainButton onPress={verificate}>Verify</MainButton>
        </View>
      </TouchableKeyboardAvoidingView>
    </View>
  );
};

export default Page;
