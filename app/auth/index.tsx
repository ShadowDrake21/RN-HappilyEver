import SmallDisplayTitle from '@components/ui/SmallDisplayTitle';
import { Link, useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, Image, Text, TouchableOpacity, View } from 'react-native';
import { Button } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import SocialButton from '~/components/SocialButton';
import { COLORS } from '~/constants/colors';
import useAuthSocials from '~/hooks/useAuthSocials';

const Page = () => {
  const { bottom } = useSafeAreaInsets();
  const router = useRouter();
  const { onSocialAuth, isLoading } = useAuthSocials();

  return (
    <ScrollView style={{ flex: 1, paddingBottom: bottom }}>
      <Image
        source={require('assets/auth/image.png')}
        style={{ width: '100%', height: 300 }}
        resizeMode="contain"
      />

      <SmallDisplayTitle addStyle={{ paddingVertical: 20 }}> Let's you in</SmallDisplayTitle>

      <View className="gap-2">
        <SocialButton
          icon="facebook-square"
          onPress={() => onSocialAuth('facebook')}
          socialName="Facebook"
        />
        <SocialButton icon="google" onPress={() => onSocialAuth('google')} socialName="Google" />
        <SocialButton icon="apple1" onPress={() => onSocialAuth('apple')} socialName="Apple" />
      </View>
      <Text className="self-center py-7 font-poppins-medium text-white">or</Text>
      <Button
        mode="contained"
        buttonColor={COLORS.accent3}
        contentStyle={{ paddingVertical: 10 }}
        style={{ borderRadius: 30 }}
        onPress={() => router.navigate('/auth/sign-in')}>
        Sign in using password
      </Button>
      <View className="flex-row items-center justify-center gap-2 self-center py-5 ">
        <Text style={{ color: COLORS.text }}>Don't have a profile?</Text>
        <Link href="/auth/sign-up" asChild>
          <TouchableOpacity>
            <Text style={{ color: COLORS.accent2 }} className="font-poppins-medium">
              Sign up
            </Text>
          </TouchableOpacity>
        </Link>
      </View>
    </ScrollView>
  );
};

export default Page;
