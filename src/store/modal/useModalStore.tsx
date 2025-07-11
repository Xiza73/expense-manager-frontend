import { create } from 'zustand';

import { logger } from '../logger';
import { ModalState, ModalStore } from './modal.model';

const initialState: Pick<ModalStore, keyof ModalState> = {
  isOpen: false,
  options: {},
};

const emptyState: ModalState = {
  isOpen: false,
  options: {},
  showCloseIcon: undefined,
  component: undefined,
  componentClassName: undefined,
  children: undefined,
  title: undefined,
  description: undefined,
  primaryLabel: undefined,
  primaryAction: undefined,
  secondaryLabel: undefined,
  secondaryAction: undefined,
};

export const useModalStore = create<ModalStore>()(
  logger<ModalStore>(
    (set) => ({
      ...initialState,
      openModal: (data) => set({ isOpen: true, ...data }),
      closeModal: () => set(emptyState),
      updateModal: (data) => set(data),
    }),
    'ModalStore',
  ),
);
