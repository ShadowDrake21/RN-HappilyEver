import * as ImagePicker from 'expo-image-picker';
import { useEffect } from 'react';
import { Linking } from 'react-native';

import { callAlert } from '~/utils/ui.utils';

const useRequestGalleryPermissions = () => {
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
};

export default useRequestGalleryPermissions;
