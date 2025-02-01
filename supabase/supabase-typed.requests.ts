import { getData, setData } from './supabase-generals.requests';
import { uploadImage } from './supabase.storage';

import {
  IMainSettingsBasicForm,
  IMainSettingsExtendedForm,
  ProfileIdealMatch,
  ProfileInterestsIds,
  ProfilePhoto,
} from '~/types/main-settings.types';
import { formatProfileQuestions } from '~/utils/database.utils';

export const getProfiles = async (token: string) => {
  return await getData(token, 'profiles');
};

export const getUserCountryId = async (token: string, user_id: string) => {
  return await getData(token, 'profiles_locations', { user_id });
};

export const getProfileById = async (token: string, user_id: string) => {
  return await getData(token, 'profiles', { user_id });
};

export const getProfileQuestions = async (token: string, user_id: string) => {
  return await getData(token, 'profiles_questions', { user_id });
};

export const getProfilePhotos = async (token: string, user_id: string) => {
  return await getData(token, 'profiles_photos', { user_id });
};

export const getProfileInterests = async (token: string, user_id: string) => {
  return await getData(token, 'profiles_interests', { user_id });
};

export const getProfileIdealMatch = async (token: string, user_id: string) => {
  return await getData(token, 'profiles_ideal_matches', { user_id });
};

export const setUserCountryId = async (token: string, user_id: string, country_id: string) => {
  await setData(token, 'profiles_locations', { user_id, country_id }, 'user_id');
};

export const setProfile = async (
  token: string,
  user_id: string,
  profile: IMainSettingsBasicForm & { email: string }
) => {
  await setData(token, 'profiles', { user_id, ...profile }, 'user_id');
};

export const setProfileQuestions = async (
  token: string,
  user_id: string,
  answers: IMainSettingsExtendedForm
) => {
  const formatedQuestions = formatProfileQuestions(user_id, answers);

  for (const item of formatedQuestions) {
    await setData(token, 'profiles_questions', item, ['user_id', 'question']);
  }
};

export const setProfilePhoto = async (token: string, user_id: string, photo: ProfilePhoto) => {
  const uploadedImage = await uploadImage({ userId: user_id, token, image: photo });
  await setData(token, 'profiles_photos', { user_id, photo_url: uploadedImage?.path }, [
    'user_id',
    'photo_url',
  ]);
};

export const setProfileInterests = async (
  token: string,
  user_id: string,
  interests: ProfileInterestsIds[]
) => {
  await setData(token, 'profiles_interests', { user_id, interests }, 'user_id');
};

export const setProfileIdealMatch = async (
  token: string,
  user_id: string,
  type: ProfileIdealMatch['id']
) => {
  await setData(token, 'profiles_ideal_matches', { user_id, type }, 'user_id');
};
