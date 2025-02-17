import axios, { AxiosRequestConfig } from 'axios';

import { formatProfile } from './format.utils';

import { DEFAULT_IMAGE } from '~/constants/variables';
import {
  getInteractedUsers,
  getMatchedUsers,
  getNotInterestedUsers,
  getProfilePhotos,
  getProfilesByGender,
  getUserCountryId,
} from '~/supabase/supabase-typed.requests';
import { downloadImage } from '~/supabase/supabase.storage';
import { ICountry } from '~/types/country.types';
import { Gender } from '~/types/shared.types';
import { IUserProfile } from '~/types/user.types';

export const fetchCountries = async (
  url: string = 'https://restcountries.com/v3.1/all',
  config?: AxiosRequestConfig<any> | undefined
): Promise<ICountry[]> => {
  return axios
    .get(url)
    .then((res) => {
      const countries = res.data as any[];
      return countries.map((country) => ({
        id: country.cca2,
        name: country.name,
        flags: country.flags,
        phoneCode: country.idd.root,
      }));
    })
    .catch((err) => {
      if (axios.isAxiosError(err)) {
        console.error('Axios error:', err.message);
      } else {
        console.error('Unexpected error:', err);
      }
      return [];
    });
};

export const fetchUserProfileImage = async (token: string, user_id: string) => {
  const rawImages = await getProfilePhotos(token, user_id);
  const formattedImageUrl = (rawImages as unknown as { photo_url: string }[])[0].photo_url;
  const downloadedImageUrl = await downloadImage({ token, imagePath: formattedImageUrl });

  return downloadedImageUrl || DEFAULT_IMAGE;
};

export const fetchUserLocation = async (token: string, user_id: string) => {
  const rawLocation = await getUserCountryId(token, user_id);
  return (rawLocation as unknown as { country_id: string }[])[0].country_id;
};

export const fetchFilteredProfiles = async (token: string, user_id: string, userGender: Gender) => {
  const rawProfile = await getProfilesByGender(token, userGender === 'male' ? 'female' : 'male');
  const formattedProfile = formatProfile(rawProfile);

  const interactedUsers = (
    (await getInteractedUsers(token, user_id)) as unknown as {
      swiped_id: string;
    }[]
  ).map((user) => ({ id: user.swiped_id }));

  const notInterestedUsers = (
    (await getNotInterestedUsers(token, user_id)) as unknown as {
      swiper_id: string;
    }[]
  ).map((user) => ({ id: user.swiper_id }));

  const filteredProfile = formattedProfile.filter(
    (profile) =>
      ![...interactedUsers, ...notInterestedUsers].some((user) => user.id === profile.user_id)
  );

  return await Promise.all(
    filteredProfile.map(async (profile) => {
      const profileUrl = await fetchUserProfileImage(token, profile.user_id);
      const countryId = await fetchUserLocation(token, profile.user_id);

      return {
        ...profile,
        user_id: profile.user_id,
        countryId,
        profileUrl,
      } as IUserProfile;
    })
  );
};

export const fetchMatchingUsers = async (token: string, match_id: number, userId: string) => {
  const matchedUsers = (await getMatchedUsers(token, match_id)) as unknown as {
    user1_id: string;
    user2_id: string;
  }[];

  const userIds = matchedUsers.flatMap((match) => [match.user1_id, match.user2_id]);

  const userPromises = userIds.map(async (user_id) => {
    const rawProfile = await getProfilePhotos(token, user_id);
    const formattedImageUrl = (rawProfile as unknown as { photo_url: string }[])[0].photo_url;
    const downloadedImageUrl = await downloadImage({ token, imagePath: formattedImageUrl });
    const image = downloadedImageUrl || DEFAULT_IMAGE;

    return {
      user_id,
      image,
      isMine: user_id === userId,
    };
  });

  return await Promise.all(userPromises);
};
