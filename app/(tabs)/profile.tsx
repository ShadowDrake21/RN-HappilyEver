import { useAuth, useUser } from '@clerk/clerk-expo';
import ProfileAccountActions from '@components/profile/ProfileAccountActions';
import ProfileOptionsList from '@components/profile/ProfileOptionsList';
import ProfileSelectImage from '@components/profile/ProfileSelectImage';
import PremiumBanner from '@components/profile/banner/PremiumBanner';
import ProfileBottomSheet from '@components/profile/bottom-sheet/ProfileBottomSheet';
import BottomSheet from '@gorhom/bottom-sheet';
import React, { useRef } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { useProfileImageSelectionContext } from '~/context/ProfileImageSelectionContext';

const Page = () => {
  const { signOut } = useAuth();

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
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View style={styles.subContainer}>
          <ProfileSelectImage onImagePress={onProfileImagePress} />
          <PremiumBanner />
          <>
            <ProfileOptionsList />
            <ProfileAccountActions onDelete={() => console.log('delete')} onSignOut={signOut} />
          </>
        </View>
      </ScrollView>
      <ProfileBottomSheet bottomSheetRef={bottomSheetRef} />
    </GestureHandlerRootView>
  );
};

export default Page;

const styles = StyleSheet.create({ subContainer: { paddingHorizontal: 20, gap: 20 } });
