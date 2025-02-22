import MainContent from '@components/auth/index/MainContent';
import MainSocialButtons from '@components/auth/index/MainSocialButtons';
import AuthBottomLink from '@components/auth/shared/AuthBottomLink';
import AuthContent from '@components/auth/shared/AuthContent';
import CustomLoader from '@components/ui/CustomLoader';
import SmallDisplayTitle from '@components/ui/SmallDisplayTitle';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, Image, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { COLORS } from '~/constants/colors';
import useAuthSocials from '~/hooks/auth/useAuthSocials';

const Page = () => {
  const { bottom } = useSafeAreaInsets();
  const router = useRouter();
  const { onSocialAuth, isLoading } = useAuthSocials();

  if (isLoading) return <CustomLoader />;

  return (
    <ScrollView style={{ flex: 1, paddingBottom: bottom }}>
      <MainContent />
      <MainSocialButtons onSocialAuth={onSocialAuth} />
      <Text className="self-center py-7 font-poppins-medium text-white">or</Text>
      <Button
        mode="contained"
        buttonColor={COLORS.accent3}
        contentStyle={{ paddingVertical: 10 }}
        style={{ borderRadius: 30 }}
        onPress={() => router.navigate('/auth/sign-in')}>
        Sign in using password
      </Button>
      <AuthBottomLink
        link={{ href: '/auth/sign-up', text: 'Sign up' }}
        text="Don't have a profile?"
      />
    </ScrollView>
  );
};

export default Page;
