import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '@supabase/supabase-js';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface UserStoreProps {
  isNewUser: boolean | null;
  setIsNewUser: (isNewUser: boolean | null) => void;
}

export const useUserStorage = create<UserStoreProps>()(
  persist(
    (set) => ({
      isNewUser: null,
      setIsNewUser: (isNewUser) => set({ isNewUser }),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
