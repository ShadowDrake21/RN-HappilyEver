import { useAuth } from '@clerk/clerk-expo';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { getProfileById } from '~/supabase/supabase-typed.requests';
import { InterlocutorType } from '~/types/chat.types';
import { fetchUserProfileImage } from '~/utils/fetch.utils';

const useChatInterlocutor = () => {
  const { getToken, userId } = useAuth();
  const [interlocutor, setInterlocutor] = useState<InterlocutorType | undefined>(undefined);

  const [isLoadingInterlocutor, setIsLoadingInterlocutor] = useState(true);

  const fetchInterlocutorImage = async (interlocutorId: string) => {
    const token = await getToken({ template: 'supabase' });

    if (!token) return;
    try {
      const profileUrl = await fetchUserProfileImage(token, interlocutorId);
      return profileUrl;
    } catch (error) {
      console.error('Error fetching profile image:', error);
    }
  };

  useEffect(() => {
    if (interlocutor?.user_id === userId) {
      console.log('Interlocutor is the current user, skipping fetch.');
    }
  }, [interlocutor]);

  const getInterlocutor = async (interlocutorId: string) => {
    const token = await getToken({ template: 'supabase' });

    if (!token) return;

    const interlocutor = (await getProfileById(
      token,
      interlocutorId
    )) as unknown as InterlocutorType;
    return interlocutor;
  };

  return {
    fetchInterlocutorImage,
    getInterlocutor,
    interlocutor,
    setInterlocutor,
    isLoadingInterlocutor,
    setIsLoadingInterlocutor,
  };
};

export default useChatInterlocutor;

const styles = StyleSheet.create({});
