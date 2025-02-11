import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '@supabase/supabase-js';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { IMainSettingsBasicForm } from '~/types/main-settings.types';

export interface UserStoreProps {
  isNewUser: boolean | null;
  setIsNewUser: (isNewUser: boolean | null) => void;

  // user: User | null;
  // setUser: (user: User | null) => void;
  // userBasicInfo: IMainSettingsBasicForm | null;
  // setUserBasicInfo: (userBasicInfo: IMainSettingsBasicForm | null) => void;
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
      // user: null,
      // setUser: (user) => set({ user }),
      // userBasicInfo: null,
      // setUserBasicInfo: (userBasicInfo) => set({ userBasicInfo }),
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
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
