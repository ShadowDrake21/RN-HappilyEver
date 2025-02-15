import { MMKV, Mode } from 'react-native-mmkv';
import { create } from 'zustand';
import { createJSONStorage, persist, StateStorage } from 'zustand/middleware';

import { Match } from '~/types/match.types';

// TODO: interface for the messages / chats
export interface MatchStoreProps {
  matches: Match[];
  addMatch: (newMatch: Match) => void;
  removeMatch: (matchId: string) => void;
  clearMatches: () => void;
}

// TODO: functions for chats
export const storage = new MMKV({
  id: 'chats-storage',
  encryptionKey: '7u/P5+hFVKBbVCjrwTR1o58jYrr0hFPC39icWNbEn2InwwuuEShjZJS+QzzePALy',
});

export const useChatsStore: StateStorage = {
  setItem: (name, value) => {
    return storage.set(name, value);
  },
  getItem: (name) => {
    const value = storage.getString(name);
    return value ?? null;
  },
  removeItem: (name) => {
    return storage.delete(name);
  },
};
