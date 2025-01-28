import AddPhotoItem from '@components/add-photos/AddPhotoItem';
import MainButtonLink from '@components/ui/MainButtonLink';
import * as ImagePicker from 'expo-image-picker';
import React, { useEffect } from 'react';
import { FlatList, Linking, StyleSheet, View } from 'react-native';
import { Text as PaperText } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { COLORS } from '~/constants/colors';
import { callAlert } from '~/utils/ui.utils';

const AVAILABLE_PHOTOS = 4;
const AVAILABLE_PHOTOS_ARRAY = Array.from({ length: AVAILABLE_PHOTOS }, (_, i) => i);

const Page = () => {
  const { bottom } = useSafeAreaInsets();
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();

  useEffect(() => {
    const checkPermission = async () => {
      if (status?.granted) return;

      const res = await requestPermission();

      if (!res.granted) {
        callAlert({
          title: 'Permission required',
          message: 'Please allow access to your photos in settings.',
          buttons: [
            {
              text: 'Open Settings',
              onPress: () => Linking.openSettings(),
            },
          ],
          options: { cancelable: false },
        });
      }
    };

    checkPermission();
  }, []);

  return (
    <View className="flex-1 justify-between" style={{ paddingBottom: bottom }}>
      <View>
        <PaperText variant="labelLarge" style={{ color: COLORS.text, paddingBottom: 20 }}>
          Upload photos that reflect your true self to connect with people who value serious
          relationships and family-oriented commitments.
        </PaperText>
        <FlatList
          data={AVAILABLE_PHOTOS_ARRAY}
          renderItem={() => <AddPhotoItem />}
          keyExtractor={(item) => item.toString()}
          numColumns={2}
          contentContainerClassName="gap-4"
          columnWrapperClassName="gap-4"
          scrollEnabled={false}
        />
      </View>
      <MainButtonLink href="./select-interests">Continue</MainButtonLink>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({});
