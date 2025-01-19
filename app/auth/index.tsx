import AntDesign from '@expo/vector-icons/AntDesign';
import { Link, useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button, Text as PaperText } from 'react-native-paper';

import { COLORS } from '~/constants/colors';

const Page = () => {
  const router = useRouter();
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
        <TouchableOpacity
          className="w-full flex-row items-center justify-center gap-2 rounded-xl py-5"
          style={{ backgroundColor: COLORS.lightDark }}>
          <AntDesign name="facebook-square" size={24} color="white" />
          <Text className="font-poppins-medium text-white">Continue with Facebook</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="w-full flex-row items-center justify-center gap-2 rounded-xl py-5"
          style={{ backgroundColor: COLORS.lightDark }}>
          <AntDesign name="google" size={24} color="white" />
          <Text className="font-poppins-medium text-white">Continue with Google</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="w-full flex-row items-center justify-center gap-2 rounded-xl py-5"
          style={{ backgroundColor: COLORS.lightDark }}>
          <AntDesign name="apple1" size={24} color="white" />
          <Text className="font-poppins-medium text-white">Continue with Apple</Text>
        </TouchableOpacity>
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
