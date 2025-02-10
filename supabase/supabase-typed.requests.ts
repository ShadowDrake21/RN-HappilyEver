import { getData, setData } from './supabase-generals.requests';
import { supabaseClient } from './supabase.client';
import { uploadImage } from './supabase.storage';

import {
  IMainSettingsBasicForm,
  IMainSettingsExtendedForm,
  ProfileIdealMatch,
  ProfileInterestsIds,
  ProfilePhoto,
} from '~/types/main-settings.types';
import { formatProfileQuestions } from '~/utils/database.utils';

// TODO: if there is an error while manipulating the main settings, then nothing saves
// (now it is like that: every step before the error is done and information is saved)
// i want if an error appears, the user is transferred to the screen where the error occurred

export const getProfiles = async (token: string) => {
  return await getData(token, 'profiles');
};

export const getProfilesByGender = async (token: string, gender: 'male' | 'female') => {
  console.log('getProfilesByGender', gender);
  return await getData(token, 'profiles', { gender });
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

export const getProfileSettingsFilledOut = async (token: string, user_id: string) => {
  return await getData(token, 'profiles', { user_id }, 'isFilledOut');
};

export const setUserCountryId = async (token: string, user_id: string, country_id: string) => {
  try {
    await setData(token, 'profiles_locations', { user_id, country_id }, 'user_id');
  } catch (error) {
    throw error;
  }
};

export const setProfile = async (
  token: string,
  user_id: string,
  profile: IMainSettingsBasicForm & { email: string }
) => {
  try {
    await setData(token, 'profiles', { user_id, ...profile }, 'user_id');
  } catch (error) {
    throw error;
  }
};

export const setProfileQuestions = async (
  token: string,
  user_id: string,
  answers: IMainSettingsExtendedForm
) => {
  const formatedQuestions = formatProfileQuestions(user_id, answers);

  for (const item of formatedQuestions) {
    try {
      await setData(token, 'profiles_questions', item, ['user_id', 'question']);
    } catch (error) {
      throw error;
    }
  }
};

export const setProfilePhoto = async (token: string, user_id: string, photo: ProfilePhoto) => {
  try {
    const uploadedImage = await uploadImage({ userId: user_id, token, image: photo });
    await setData(token, 'profiles_photos', { user_id, photo_url: uploadedImage?.path }, [
      'user_id',
      'photo_url',
    ]);
  } catch (error) {
    throw error;
  }
};

export const setProfileInterests = async (
  token: string,
  user_id: string,
  interests: ProfileInterestsIds[]
) => {
  try {
    await setData(token, 'profiles_interests', { user_id, interests }, 'user_id');
  } catch (error) {
    throw error;
  }
};

export const setProfileIdealMatch = async (
  token: string,
  user_id: string,
  type: ProfileIdealMatch['id']
) => {
  try {
    await setData(token, 'profiles_ideal_matches', { user_id, type }, 'user_id');
  } catch (error) {
    throw error;
  }
};

export const updateProfileContentFilledOut = async (
  token: string,
  user_id: string,
  value: boolean
) => {
  const supabase = await supabaseClient(token);
  const { error } = await supabase
    .from('profiles')
    .update({ isFilledOut: value })
    .eq('user_id', user_id);

  if (error) {
    throw new Error(`Error updating profile filling out: ${error.message}`);
  }
};
