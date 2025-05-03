import { create } from 'zustand';

import { getItem } from '@/utils/local-storage.util';

import { logger } from '../logger';
import { DarkModeState, DarkModeStore } from './dark-mode.model';

const initialState: DarkModeState = {
  isDarkMode: getItem('isDarkMode') === true,
};

export const useDarkModeStore = create<DarkModeStore>()(
  logger<DarkModeStore>((set) => ({
    ...initialState,
    setDarkMode: (isDarkMode) => {
      set((state) => ({
        ...state,
        isDarkMode,
      }));
    },
  })),
);
