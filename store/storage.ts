import Constants from 'expo-constants';
import { MMKV } from 'react-native-mmkv';
import { StateStorage } from 'zustand/middleware';

const encryptionKey =
  Constants.expoConfig?.extra?.MMKV_ENCRYPTION_KEY ||
  '7u/P5+hFVKBbVCjrwTR1o58jYrr0hFPC39icWNbEn2InwwuuEShjZJS+QzzePALy';

if (!encryptionKey) {
  throw new Error('Missing MMKV_ENCRYPTION_KEY in Expo extra config');
}

export const storage = new MMKV({
  id: 'storage',
  encryptionKey,
});

export const zustandStorage: StateStorage = {
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
