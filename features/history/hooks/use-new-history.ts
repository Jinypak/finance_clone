import { create } from 'zustand';

type NewHistoryState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useNewHistory = create<NewHistoryState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
