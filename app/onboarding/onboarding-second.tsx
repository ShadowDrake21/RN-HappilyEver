import { Link } from 'expo-router';
import React from 'react';
import { Image, Text, View } from 'react-native';
import { Button, Text as PaperText } from 'react-native-paper';

import { COLORS } from '~/constants/colors';

const Page = () => {
  return (
    <View className="flex-1 justify-between">
      <Image
        source={require('assets/onboarding/onboarding-2.png')}
        className="h-[400] w-full"
        resizeMode="contain"
      />

      <PaperText
        variant="displaySmall"
        style={{
          color: COLORS.text,
          textAlign: 'center',
          fontFamily: 'Poppins-Regular',
          fontWeight: '600',
        }}>
        Chat and connect deeply. Build lasting bonds.
      </PaperText>
      <View>
        <Link href="/auth" asChild>
          <Button mode="text" textColor={COLORS.accent2} style={{ paddingVertical: 10 }}>
            <Text>Skip</Text>
          </Button>
        </Link>
        <Link href="./onboarding-third" asChild>
          <Button
            mode="contained"
            buttonColor={COLORS.accent3}
            style={{ paddingVertical: 5, borderRadius: 30 }}>
            <Text>Next</Text>
          </Button>
        </Link>
      </View>
    </View>
  );
};

export default Page;
