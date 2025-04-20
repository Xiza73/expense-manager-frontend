import { create } from 'zustand';

import { logger } from '../logger';
import { ModalState, ModalStore } from './modal.model';

const initialState: Pick<ModalStore, keyof ModalState> = {
  isOpen: false,
  options: {},
};

export const useModalStore = create<ModalStore>()(
  logger<ModalStore>(
    (set) => ({
      ...initialState,
      openModal: (data) => set({ isOpen: true, ...data }),
      closeModal: () => set({ isOpen: false }),
      updateModal: (data) => set(data),
    }),
    'ModalStore',
  ),
);
