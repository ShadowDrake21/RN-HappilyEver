import { useAuth } from '@clerk/clerk-expo';
import { useCallback, useEffect, useState } from 'react';

import { getProfilePhotos } from '~/supabase/supabase-typed.requests';
import { downloadImage } from '~/supabase/supabase.storage';

type UserType = { user_id: string; image: string; isMine: boolean };

const useRetrieveMatch = ({ user1_id, user2_id }: { user1_id: string; user2_id: string }) => {
  const { getToken, userId } = useAuth();

  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<{ firstUser: UserType; secondUser: UserType }>({
    firstUser: { user_id: '', image: '', isMine: false },
    secondUser: { user_id: '', image: '', isMine: false },
  });

  useEffect(() => {
    retrieveMatchData();
  }, [user1_id, user2_id]);

  const retrieveMatchData = useCallback(async () => {
    setLoading(true);
    try {
      const token = await getToken({ template: 'supabase' });
      if (!token) return;

      const userIds = [user1_id, user2_id];
      const userPromises = userIds.map(async (user_id) => {
        const rawProfile = await getProfilePhotos(token, user_id);
        const formattedImageUrl = (rawProfile as unknown as { photo_url: string }[])[0].photo_url;
        const downloadedImageUrl = await downloadImage({ token, imagePath: formattedImageUrl });
        const image =
          downloadedImageUrl ||
          'https://media.defense.gov/2018/Sep/21/2002043408/400/400/0/180921-D-BD104-006.JPG';

        return {
          user_id,
          image,
          isMine: user_id === userId,
        };
      });

      const [firstUser, secondUser] = await Promise.all(userPromises);
      setUsers({ firstUser, secondUser });
    } catch (error) {
      console.error('Error retrieving match data', error);
    } finally {
      setLoading(false);
    }
  }, [user1_id, user2_id, userId]);

  const getChatId = () => {
    return user1_id === userId ? user2_id : user1_id;
  };

  return { loading, users, retrieveMatchData, getChatId };
};

export default useRetrieveMatch;
