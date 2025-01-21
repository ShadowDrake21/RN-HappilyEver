import AntDesign from '@expo/vector-icons/AntDesign';
import { makeRedirectUri } from 'expo-auth-session';
import * as QueryParams from 'expo-auth-session/build/QueryParams';
import { Link, useRouter } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button, Text as PaperText } from 'react-native-paper';

import SocialButton from '~/components/SocialButton';
import { COLORS } from '~/constants/colors';
import { supabase } from '~/utils/supabase';

WebBrowser.maybeCompleteAuthSession();
const redirectTo = makeRedirectUri();

const Page = () => {
  const router = useRouter();
  const createSessionFromUrl = async (url: string) => {
    const { params, errorCode } = QueryParams.getQueryParams(url);

    if (errorCode) throw new Error(errorCode);
    const { access_token, refresh_token } = params;

    if (!access_token) return;

    const { data, error } = await supabase.auth.setSession({
      access_token,
      refresh_token,
    });
    if (error) throw error;
    return data.session;
  };

  const performOAuth = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'facebook',
      options: {
        redirectTo,
        skipBrowserRedirect: true,
      },
    });
    if (error) throw error;

    const res = await WebBrowser.openAuthSessionAsync(data?.url ?? '', redirectTo);

    if (res.type === 'success') {
      const { url } = res;
      const session = await createSessionFromUrl(url);

      console.log(session);
    }
  };

  const performOAuthGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo,
        skipBrowserRedirect: true,
      },
    });
    if (error) throw error;

    const res = await WebBrowser.openAuthSessionAsync(data?.url ?? '', redirectTo);

    if (res.type === 'success') {
      const { url } = res;
      const session = await createSessionFromUrl(url);

      console.log(session);
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <Image
        source={require('assets/auth/image.png')}
        style={{ width: '100%', height: 350 }}
        resizeMode="contain"
      />

      <PaperText
        variant="displaySmall"
        style={{
          color: COLORS.text,
          textAlign: 'center',
          fontFamily: 'Poppins-Regular',
          fontWeight: '600',
          paddingVertical: 20,
        }}>
        Let's you in
      </PaperText>
      <View className="gap-2">
        <SocialButton icon="facebook-square" onPress={performOAuth} socialName="Facebook" />
        <SocialButton icon="google" onPress={performOAuthGoogle} socialName="Google" />
        <SocialButton icon="apple1" onPress={() => console.log('Apple')} socialName="Apple" />
      </View>
      <Text className="self-center py-7 font-poppins-medium text-white">or</Text>
      <Button
        mode="contained"
        buttonColor={COLORS.accent3}
        style={{ paddingVertical: 10, borderRadius: 30 }}
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
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({});
