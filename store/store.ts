import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '@supabase/supabase-js';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface AuthStoreProps {
  isLoggedIn: boolean;
  isNewUser: boolean;
  user: User | null;

  setUser: (user: User | null, isNewUser: boolean) => void;
  logOut: () => void;
}

export const useAuthStore = create<AuthStoreProps>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      isNewUser: false,
      user: null,
      setUser: (user, isNewUser) => set({ user, isLoggedIn: !!user, isNewUser }),
      logOut: () => set({ user: null, isLoggedIn: false, isNewUser: false }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
