import { create } from 'zustand';

import { logger } from '../logger';
import { ErrorState, ErrorStore } from './error.model';

const initialState: Pick<ErrorStore, keyof ErrorState> = {
  error: null,
};

export const useErrorStore = create<ErrorStore>()(
  logger<ErrorStore>(
    (set) => ({
      ...initialState,
      setError: (error: string | null) => {
        set((state) => ({
          ...state,
          error,
        }));
      },
    }),
    'ErrorStore',
  ),
);
