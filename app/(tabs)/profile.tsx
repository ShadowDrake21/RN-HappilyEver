import { useUser } from '@clerk/clerk-expo';
import ParagraphText from '@components/ui/ParagraphText';
import SecondaryButton from '@components/ui/SecondaryButton';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
  ScrollView,
  Alert,
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import LoaderKit from 'react-native-loader-kit';
import { IconButton, Text as PaperText } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { COLORS } from '~/constants/colors';

const Page = () => {
  const router = useRouter();
  const { user } = useUser();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const { bottom } = useSafeAreaInsets();
  const [toggleBottomSheet, setToggleBottomSheet] = useState(false);
  const [selectedProfileImage, setSelectedProfileImage] = useState<string>('');
  const [buttonsVisibitity, setButtonsVisibitity] = useState(false);
  const [selectionLoading, setSelectionLoading] = useState(false);

  const pickImageAsync = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      setSelectedProfileImage('data:image/jpeg;base64,' + result.assets[0].base64 || '');
      setButtonsVisibitity(true);
      bottomSheetRef.current?.close();
    } else {
      Alert.alert('You did not select any image.');
    }
  };

  const takeImageAsync = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      setSelectedProfileImage(result.assets[0].base64 || '');
      setButtonsVisibitity(true);
      bottomSheetRef.current?.close();
    } else {
      alert('You did not take any image.');
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ paddingHorizontal: 20, gap: 20 }}>
          <View style={{ position: 'relative', flex: 1 }}>
            <View style={{ flexDirection: 'row', gap: 15, alignSelf: 'center' }}>
              <View className="self-center">
                <Pressable
                  onPress={() => {
                    if (toggleBottomSheet) {
                      setToggleBottomSheet(false);
                      bottomSheetRef.current?.close();
                    } else {
                      setToggleBottomSheet(true);
                      bottomSheetRef.current?.expand();
                    }
                  }}>
                  {selectedProfileImage ? (
                    <Image
                      source={{ uri: selectedProfileImage }}
                      style={{ width: 200, height: 200, borderRadius: 100 }}
                      resizeMode="cover"
                    />
                  ) : (
                    <Image
                      source={{ uri: user?.imageUrl }}
                      style={{ width: 200, height: 200, borderRadius: 100 }}
                      resizeMode="cover"
                    />
                  )}
                </Pressable>
              </View>
              {buttonsVisibitity && (
                <View style={{ justifyContent: 'center' }}>
                  <IconButton
                    icon="check"
                    iconColor="green"
                    size={30}
                    onPress={() => {
                      setSelectionLoading(true);
                      user
                        ?.setProfileImage({ file: selectedProfileImage })
                        .then(() => {
                          setButtonsVisibitity(false);
                          setSelectedProfileImage('');
                        })
                        .finally(() => setSelectionLoading(false));
                    }}
                  />
                  <IconButton
                    icon="close"
                    iconColor="red"
                    size={30}
                    onPress={() => setSelectedProfileImage('')}
                  />
                </View>
              )}
              {selectionLoading && (
                <View
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <LoaderKit
                    name="BallPulseSync"
                    style={{ width: 80, height: 80 }}
                    color={COLORS.mainPurple}
                  />
                </View>
              )}
            </View>
          </View>

          <ImageBackground
            source={require('assets/premium-bg.jpg')}
            style={{ width: '100%', borderRadius: 20, overflow: 'hidden' }}
            blurRadius={3}
            resizeMode="cover">
            <View
              style={{ gap: 20, paddingHorizontal: 10, paddingVertical: 20, alignItems: 'center' }}>
              <Image
                source={require('assets/premium-profile.jpg')}
                style={{ width: 200, height: 200, borderRadius: 100 }}
              />
              <View style={{ flex: 1, width: '100%', justifyContent: 'center', gap: 10 }}>
                <PaperText
                  variant="titleLarge"
                  style={{ color: COLORS.text, textAlign: 'center', fontWeight: '700' }}>
                  💖 Unlock Your Best Dating Experience!
                </PaperText>
                <ParagraphText style={{ textAlign: 'center' }}>
                  Unlock exclusive features and connect faster! See who liked you, chat without
                  limits, and boost your profile. Upgrade now and find your perfect match! 🚀
                </ParagraphText>
              </View>
              <SecondaryButton
                style={{ backgroundColor: COLORS.secondaryPurple }}
                onPress={() => router.push('/premium')}>
                Upgrade to Premium
              </SecondaryButton>
            </View>
          </ImageBackground>
        </View>

        <BottomSheet
          ref={bottomSheetRef}
          onClose={() => {
            setToggleBottomSheet(false);
            bottomSheetRef.current?.close();
          }}
          snapPoints={['40%']}
          enablePanDownToClose
          backgroundStyle={{ backgroundColor: COLORS.dark, borderRadius: 25 }}
          containerStyle={styles.photoSelectorContainer}
          handleIndicatorStyle={{ backgroundColor: COLORS.extremelyDark }}
          index={-1}>
          <BottomSheetScrollView
            contentContainerStyle={{ paddingBottom: bottom, gap: 15 }}
            style={{ padding: 20 }}>
            <SecondaryButton
              style={{ backgroundColor: COLORS.slayish }}
              onPress={() => takeImageAsync()}
              icon={({ size }) => (
                <MaterialIcons name="photo-camera" size={size} color={COLORS.text} />
              )}>
              Take a photo
            </SecondaryButton>
            <SecondaryButton
              style={{ backgroundColor: COLORS.accent2 }}
              onPress={() => pickImageAsync()}
              icon={({ size }) => (
                <MaterialIcons name="photo-library" size={size} color={COLORS.text} />
              )}>
              Choose from gallery
            </SecondaryButton>

            <SecondaryButton
              style={{ backgroundColor: COLORS.error }}
              onPress={() => {
                setToggleBottomSheet(false);
                bottomSheetRef.current?.close();
              }}
              icon={({ size }) => <FontAwesome name="close" size={size} color={COLORS.text} />}>
              Cancel
            </SecondaryButton>
          </BottomSheetScrollView>
        </BottomSheet>
      </ScrollView>
    </GestureHandlerRootView>
  );
};

export default Page;

const styles = StyleSheet.create({
  photoSelectorContainer: { flex: 1, borderTopLeftRadius: 20, borderTopRightRadius: 20 },
});
