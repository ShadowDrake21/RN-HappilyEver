import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { zustandStorage } from './storage';

import { ChatStoreItem } from '~/types/store.types';

export interface ChatStoreProps {
  chats: ChatStoreItem[];
  addChat: (newChat: ChatStoreItem) => void;
  removeChat: (chatId: number) => void;
  clearChats: () => void;
}

export const useChatStore = create<ChatStoreProps>()(
  persist(
    (set) => ({
      chats: [],
      addChat: (newChat) => set((state) => ({ chats: [...state.chats, newChat] })),
      removeChat: (chatId) =>
        set((state) => ({ chats: state.chats.filter((chat) => chat.chatId !== chatId) })),
      clearChats: () => set({ chats: [] }),
    }),
    {
      name: 'chat-storage',
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);
