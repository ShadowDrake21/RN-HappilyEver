import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { zustandStorage } from './storage';

export interface UserStoreProps {
  isNewUser: boolean | null;
  setIsNewUser: (isNewUser: boolean | null) => void;
  userGender: string | null;
  setUserGender: (userGender: string | null) => void;
  userCountryId: string | null;
  userGenderLoading: boolean;
  setUserGenderLoading: (userGenderLoading: boolean) => void;
  setUserCountryId: (userCountryId: string | null) => void;
  userBirthday: string | null;
  setUserBirthday: (userBirthday: string | null) => void;
  setToDefault: () => void;
}

export const useUserStorage = create<UserStoreProps>()(
  persist(
    (set) => ({
      isNewUser: null,
      setIsNewUser: (isNewUser) => set({ isNewUser }),
      userGender: null,
      setUserGender: (userGender) => set({ userGender }),
      userGenderLoading: false,
      setUserGenderLoading: (userGenderLoading) => set({ userGenderLoading }),
      userCountryId: null,
      setUserCountryId: (userCountryId) => set({ userCountryId }),
      userBirthday: null,
      setUserBirthday: (userBirthday) => set({ userBirthday }),
      setToDefault: () =>
        set({ isNewUser: null, userGender: null, userCountryId: null, userBirthday: null }),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);
