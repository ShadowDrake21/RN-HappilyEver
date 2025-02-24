import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { zustandStorage } from './storage';

import { Match } from '~/types/match.types';

export interface MatchStoreProps {
  matches: Match[];
  addMatch: (newMatch: Match) => void;
  removeMatch: (matchId: string) => void;
  clearMatches: () => void;
}

export const useMatchStore = create<MatchStoreProps>()(
  persist(
    (set) => ({
      matches: [],
      addMatch: (newMatch) => set((state) => ({ matches: [...state.matches, newMatch] })),
      removeMatch: (matchId) =>
        set((state) => ({ matches: state.matches.filter((match) => match.id !== matchId) })),
      clearMatches: () => set({ matches: [] }),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);
