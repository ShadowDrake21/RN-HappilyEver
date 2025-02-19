import { UserResponse } from '@supabase/supabase-js';
import { IMessage } from 'react-native-gifted-chat';

import { DEFAULT_IMAGE } from '~/constants/variables';
import { FormattedMessage, MessageUserType, RawMessage } from '~/types/chat.types';
import {
  IMainSettingsBasicForm,
  ProfileInterestsCategory,
  ProfileInterestsIds,
} from '~/types/main-settings.types';

export const getInterestsLine = (
  category: ProfileInterestsCategory | undefined,
  profileInterest: ProfileInterestsIds
) =>
  category?.interests
    .filter((interest) => profileInterest.interestIds.some((id) => id === interest.id))
    .map((interest) => interest.title)
    .join(', ');

export const formatCategory = (category: string) => {
  return category.replace(/([a-z])([A-Z])/g, '$1 $2');
};

export const formatProfile = (
  rawProfile: unknown[]
): (IMainSettingsBasicForm & { id: string; user_id: string })[] => {
  return rawProfile.map((rawProfile) => {
    const profile = rawProfile as {
      id: string;
      user_id: string;
      fullName: string;
      username: string;
      gender: string;
      birthDate: string;
      phoneNumber: string;
      occupation: string;
    };

    return {
      id: profile.id,
      user_id: profile.user_id,
      fullName: profile.fullName,
      username: profile.username,
      gender: profile.gender,
      birthDate: profile.birthDate ? new Date(profile.birthDate) : undefined,
      phoneNumber: profile.phoneNumber,
      occupation: profile.occupation,
    };
  });
};

export const formatMessages = (rawMessages: RawMessage[]): IMessage[] => {
  return rawMessages.map((rawMessage) => {
    return {
      _id: rawMessage.id,
      text: rawMessage.content,
      createdAt: new Date(rawMessage.created_at),
      user: {
        _id: rawMessage.user.user_id,
        name: rawMessage.user.fullName,
      },
    };
  });
};

export const formChatUser = (user: {
  id?: string;
  fullName?: string | null;
  imageUrl?: string;
}) => {
  const messageUser: MessageUserType = {
    _id: user?.id || '',
    name: user?.fullName || 'Unknown user',
    avatar: user?.imageUrl || DEFAULT_IMAGE,
  };
  return messageUser;
};
