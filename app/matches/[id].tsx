import { useAuth } from '@clerk/clerk-expo';
import CustomLoader from '@components/ui/CustomLoader';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Svg, { Defs, ClipPath, Path } from 'react-native-svg';

import { getLimitedProfilePhotos, getProfilePhotos } from '~/supabase/supabase-typed.requests';
import { downloadImage } from '~/supabase/supabase.storage';

const Page = () => {
  const { getToken, userId } = useAuth();

  const { id, user1_id, user2_id } = useLocalSearchParams<{
    id: string;
    user1_id: string;
    user2_id: string;
  }>();

  const [firstUser, setFirstUser] = useState<{ user_id: string; image: string; isMine: boolean }>({
    user_id: '',
    image: '',
    isMine: false,
  });
  const [secondUser, setSecondUser] = useState<{ user_id: string; image: string; isMine: boolean }>(
    { user_id: '', image: '', isMine: false }
  );

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    retrieveMatchData();
  }, [user1_id, user2_id]);

  const retrieveMatchData = async () => {
    setLoading(true);
    const token = await getToken({ template: 'supabase' });
    if (token) {
      [user1_id, user2_id].forEach(async (user_id, index) => {
        const rawProfile = await getProfilePhotos(token, user_id);
        const formattedImageUrl = (rawProfile as unknown as { photo_url: string }[])[0].photo_url;
        const downloadedImageUrl = await downloadImage({ token, imagePath: formattedImageUrl });
        const image =
          downloadedImageUrl ||
          'https://media.defense.gov/2018/Sep/21/2002043408/400/400/0/180921-D-BD104-006.JPG';

        if (index === 0) {
          setFirstUser({
            user_id,
            image,
            isMine: user_id === userId,
          });
        } else {
          setSecondUser({
            user_id,
            image,
            isMine: user_id === userId,
          });
        }
      });
    }
    setLoading(false);
  };

  if (loading) return <CustomLoader />;

  return (
    <View style={{ paddingTop: 100 }}>
      <Text>
        {id} {user1_id} {user2_id}
      </Text>
      <View className="flex flex-row">
        <Image
          source={{ uri: firstUser.image }}
          style={{ width: 200, height: 200 }}
          className="rounded-full"
        />
        <Image
          source={{ uri: secondUser.image }}
          style={{ width: 200, height: 200 }}
          className="rounded-full"
        />
      </View>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({});
