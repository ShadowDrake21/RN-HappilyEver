import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { zustandStorage } from './storage';

export interface ChatStoreProps {
  chats: { id: number; interlocutorId: string }[];
  addChat: (newChat: { id: number; interlocutorId: string }) => void;
  removeChat: (chatId: number) => void;
  clearChats: () => void;
}

export const useChatStore = create<ChatStoreProps>()(
  persist(
    (set) => ({
      chats: [],
      addChat: (newChat) => set((state) => ({ chats: [...state.chats, newChat] })),
      removeChat: (chatId) =>
        set((state) => ({ chats: state.chats.filter((chat) => chat.id !== chatId) })),
      clearChats: () => set({ chats: [] }),
    }),
    {
      name: 'chat-storage',
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);
