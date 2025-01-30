import { supabaseClient } from './supabaseClient';
import { uploadImage } from './supabaseStorage';

import {
  IMainSettingsBasicForm,
  IMainSettingsExtendedForm,
  ProfileIdealMatch,
  ProfileInterestsIds,
  ProfilePhoto,
} from '~/types/main-settings.types';
import { formatProfileQuestions } from '~/utils/database.utils';

const handleSupabaseError = (message: string, error: any) => {
  if (error) {
    throw new Error(`${message}: ${error}`);
  }
};

export const getProfiles = async (token: string) => {
  const supabase = await supabaseClient(token);
  const { data, error } = await supabase.from('profiles').select('*');
  handleSupabaseError('Error fetching profiles', error);

  return data;
};

export const getProfileById = async (token: string, user_id: string) => {
  const supabase = await supabaseClient(token);
  const { data, error } = await supabase.from('profiles').select('*').eq('user_id', user_id);
  handleSupabaseError('Error fetching profile by id', error);

  return data;
};

export const setProfile = async (
  token: string,
  user_id: string,
  profile: IMainSettingsBasicForm & { email: string }
) => {
  const supabase = await supabaseClient(token);

  const { error } = await supabase
    .from('profiles')
    .upsert({ user_id, ...profile }, { onConflict: 'user_id' });
  handleSupabaseError('Error setting profile', error);
};

export const getProfileQuestions = async (token: string, user_id: string) => {
  const supabase = await supabaseClient(token);
  const { data, error } = await supabase
    .from('profile_questions')
    .select('*')
    .eq('user_id', user_id);
  handleSupabaseError('Error fetching profile questions', error);

  return data;
};

export const setProfileQuestions = async (
  token: string,
  user_id: string,
  answers: IMainSettingsExtendedForm
) => {
  const supabase = await supabaseClient(token);
  const formatedQuestions = formatProfileQuestions(user_id, answers);

  for (const item of formatedQuestions) {
    const { error } = await supabase
      .from('profile_questions')
      .upsert(item, { onConflict: 'user_id, answer' });
    handleSupabaseError('Error setting profile questions', error);
  }
};

export const getProfilePhotos = async (token: string, user_id: string) => {
  const supabase = await supabaseClient(token);
  const { data, error } = await supabase.from('profiles_photos').select('*').eq('user_id', user_id);

  handleSupabaseError('Error fetching profile photos', error);

  return data;
};

export const setProfilePhoto = async (token: string, user_id: string, photo: ProfilePhoto) => {
  const supabase = await supabaseClient(token);
  const uploadedImage = await uploadImage({ userId: user_id, token, image: photo });
  const { error } = await supabase
    .from('profiles_photos')
    .upsert({ user_id, photo_url: uploadedImage?.path }, { onConflict: 'user_id, photo_url' });

  handleSupabaseError('Error setting profile photo', error);
};

export const getProfileInterests = async (token: string, user_id: string) => {
  const supabase = await supabaseClient(token);
  const { data, error } = await supabase
    .from('profile_interests')
    .select('*')
    .eq('user_id', user_id);

  handleSupabaseError('Error fetching profile interests', error);

  return data;
};

export const setProfileInterests = async (
  token: string,
  user_id: string,
  interests: ProfileInterestsIds[]
) => {
  const supabase = await supabaseClient(token);
  const { error } = await supabase
    .from('profile_interests')
    .upsert([{ user_id, interests }], { onConflict: 'user_id' });

  handleSupabaseError('Error setting profile interests', error);
};

export const getProfileIdealMatch = async (token: string, user_id: string) => {
  const supabase = await supabaseClient(token);
  const { error } = await supabase.from('profile_ideal_match').select('*').eq('user_id', user_id);

  handleSupabaseError('Error fetching profile ideal match', error);
};

export const setProfileIdealMatch = async (token: string, type: ProfileIdealMatch['id']) => {
  const supabase = await supabaseClient(token);
  const { error } = await supabase
    .from('profile_ideal_match')
    .upsert({ type }, { onConflict: 'user_id' });

  handleSupabaseError('Error setting profile ideal match', error);
};
