import { decode } from 'base64-arraybuffer';

import { supabaseClient } from './supabase.client';

import { ProfilePhoto } from '~/types/main-settings.types';
import { readFileAsDataURL } from '~/utils/storage.utils';

export const retrieveUserBucket = async (token: string, user_id: string) => {
  const supabase = await supabaseClient(token);
  const { data, error } = await supabase.storage.getBucket(user_id);

  if (error) {
    throw new Error(`Error retrieving bucket: ${error}`);
  }

  return data;
};

export const emptyUserBucket = async (token: string, user_id: string) => {
  const supabase = await supabaseClient(token);
  const { data, error } = await supabase.storage.emptyBucket(user_id);

  if (error) {
    throw new Error(`Error emptying bucket: ${error}`);
  }

  return data;
};

// DELETE IMAGES AFTER UPDATING

export const uploadImage = async ({
  userId,
  token,
  image,
}: {
  userId: string;
  token: string;
  image: ProfilePhoto;
}) => {
  const supabase = await supabaseClient(token);
  const { data, error } = await supabase.storage
    .from('user-photos')
    .upload(`${userId}/${image.name}`, decode(image.base64), {
      contentType: 'image/jpeg',
    });

  if (error) {
    throw error;
  }

  return data;
};

export const downloadImage = async ({ token, imagePath }: { token: string; imagePath: string }) => {
  const supabase = await supabaseClient(token);
  const { data, error } = await supabase.storage.from('user-photos').download(imagePath);

  if (error) {
    console.error('Error downloading image:', error);
  }
  if (!data) {
    console.error('No data returned');
    return null;
  }

  try {
    const dataUrl = readFileAsDataURL(data);
    return dataUrl;
  } catch (error) {
    console.error('Error reading image:', error);
    return null;
  }
};

export const updateImage = async ({
  token,
  file,
  imagePath,
}: {
  token: string;
  file: string;
  imagePath: string;
}) => {
  const supabase = await supabaseClient(token);
  const { data, error } = await supabase.storage
    .from('user-photos')
    .update(imagePath, decode(file), {
      cacheControl: '3600',
      upsert: true,
      contentType: 'image/jpeg',
    });

  if (error) {
    console.error('error', error);
    return;
  }

  return data;
};

export const deleteImage = async ({ token, imagePath }: { token: string; imagePath: string }) => {
  const supabase = await supabaseClient(token);
  const { error } = await supabase.storage.from('user-photos').remove([imagePath]);

  if (error) {
    console.error('Error deleting image:', error);
  }
};
