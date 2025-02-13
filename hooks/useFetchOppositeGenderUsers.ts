import { useAuth } from '@clerk/clerk-expo';
import { useCallback, useEffect, useState } from 'react';

import { mock_users } from '~/content/users.content';
import { useSwipesContext } from '~/context/SwipesContext';
import { useUserStorage } from '~/store/store';
import {
  getProfilePhotos,
  getProfilesByGender,
  getUserCountryId,
} from '~/supabase/supabase-typed.requests';
import { downloadImage } from '~/supabase/supabase.storage';
import { IUserProfile } from '~/types/user.types';
import { formatProfile } from '~/utils/format.utils';

const useFetchOppositeGenderUsers = () => {
  const { getToken, userId } = useAuth();
  const [data, setData] = useState<IUserProfile[]>([]);
  const { setIsSwipesLoading } = useSwipesContext();
  const { userGender } = useUserStorage();

  const fetchUserProfile = async (token: string, user_id: string) => {
    const rawImages = await getProfilePhotos(token, user_id);
    const formattedImageUrl = (rawImages as unknown as { photo_url: string }[])[0].photo_url;
    const downloadedImageUrl = await downloadImage({ token, imagePath: formattedImageUrl });

    return (
      downloadedImageUrl ||
      'https://media.defense.gov/2018/Sep/21/2002043408/400/400/0/180921-D-BD104-006.JPG'
    );
  };

  const fetchUserLocation = async (token: string, user_id: string) => {
    const rawLocation = await getUserCountryId(token, user_id);
    return (rawLocation as unknown as { country_id: string }[])[0].country_id;
  };

  const fetchUsers = useCallback(async () => {
    setIsSwipesLoading(true);
    try {
      if (!userGender) return;
      const token = await getToken({ template: 'supabase' });

      if (token && userId) {
        const rawProfile = await getProfilesByGender(
          token,
          userGender === 'male' ? 'female' : 'male'
        );
        const formattedProfile = formatProfile(rawProfile);

        const userProfiles = await Promise.all(
          formattedProfile.map(async (profile) => {
            const profileUrl = await fetchUserProfile(token, profile.user_id);
            const countryId = await fetchUserLocation(token, profile.user_id);

            return {
              ...profile,
              user_id: profile.user_id,
              countryId,
              profileUrl,
            } as IUserProfile;
          })
        );

        setData((prev) => [...userProfiles, ...mock_users]);
      }
    } catch (error) {
      console.error('Error fetching users', error);
    } finally {
      setIsSwipesLoading(false);
    }
  }, [userId, userGender, setIsSwipesLoading]);

  useEffect(() => {
    if (userGender) fetchUsers();
  }, [userGender, fetchUsers]);

  return { data };
};

export default useFetchOppositeGenderUsers;
