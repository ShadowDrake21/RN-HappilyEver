import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '@supabase/supabase-js';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface AuthStoreProps {
  isLoggedIn: boolean;
  user: User | null;
  setUser: (user: User | null) => void;
  logOut: () => void;
}

export const useAuthStore = create<AuthStoreProps>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      user: null,
      setUser: (user) => set({ user, isLoggedIn: !!user }),
      logOut: () => set({ user: null, isLoggedIn: false }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
