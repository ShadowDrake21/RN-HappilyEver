import PremiumBanner from '@components/profile/PremiumBanner';
import ProfileBottomSheet from '@components/profile/ProfileBottomSheet';
import ProfileOptionsList from '@components/profile/ProfileOptionsList';
import ProfileSelectImage from '@components/profile/ProfileSelectImage';
import SecondaryButton from '@components/ui/SecondaryButton';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import BottomSheet from '@gorhom/bottom-sheet';
import React, { useRef, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { COLORS } from '~/constants/colors';
import { useProfileImageSelectionContext } from '~/context/ProfileImageSelectionContext';

const Page = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const { toggleBottomSheet, setToggleBottomSheet } = useProfileImageSelectionContext();

  const onProfileImagePress = () => {
    if (toggleBottomSheet) {
      setToggleBottomSheet(false);
      bottomSheetRef.current?.close();
    } else {
      setToggleBottomSheet(true);
      bottomSheetRef.current?.expand();
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ paddingHorizontal: 20, gap: 20 }}>
          <ProfileSelectImage onImagePress={onProfileImagePress} />

          <PremiumBanner />
          <>
            <ProfileOptionsList />
            <View style={{ gap: 15 }}>
              <SecondaryButton
                style={{ backgroundColor: COLORS.error }}
                icon={({ size, color }) => (
                  <MaterialIcons name="delete" size={size} color={color} />
                )}
                onPress={() => {
                  console.log('Delete Account');
                }}>
                Delete Account
              </SecondaryButton>
              <SecondaryButton
                style={{ backgroundColor: COLORS.mainPurple }}
                icon={({ size, color }) => (
                  <MaterialIcons name="logout" size={size} color={color} />
                )}
                onPress={() => {
                  console.log('Logout');
                }}>
                Logout
              </SecondaryButton>
            </View>
          </>
        </View>
      </ScrollView>
      <ProfileBottomSheet bottomSheetRef={bottomSheetRef} />
    </GestureHandlerRootView>
  );
};

export default Page;

const styles = StyleSheet.create({});
