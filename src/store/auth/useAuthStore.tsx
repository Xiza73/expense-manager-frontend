import { create } from 'zustand';

import { logger } from '../logger';
import { AuthState, AuthStore } from './auth.model';

const initialState: Pick<AuthStore, keyof AuthState> = {
  isAuthenticated: false,
  isProcessing: true,
};

export const useAuthStore = create<AuthStore>()(
  logger<AuthStore>(
    (set) => ({
      ...initialState,
      login: (user) =>
        set({ isAuthenticated: true, isProcessing: false, user }),
      logout: () => set({ isAuthenticated: false, user: undefined }),
      endProcessing: () => set({ isProcessing: false }),
    }),
    'AuthStore',
  ),
);
