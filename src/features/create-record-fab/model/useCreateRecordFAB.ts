import { create } from 'zustand';

interface CreateRecordFABState {
  isOpen: boolean;
  toggle: () => void;
}

export const useCreateRecordFAB = create<CreateRecordFABState>(set => ({
  isOpen: false,
  toggle: () => set(state => ({ isOpen: !state.isOpen })),
}));
