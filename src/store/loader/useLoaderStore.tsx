import { create } from 'zustand';

import { logger } from '../logger';
import { LoaderState, LoaderStore } from './loader.model';

const initialState: Pick<LoaderStore, keyof LoaderState> = {
  activeLoaders: 0,
  isFetching: false,
  hideLoader: false,
};

export const useLoaderStore = create<LoaderStore>()(
  logger<LoaderStore>(
    (set) => ({
      ...initialState,
      pushLoader: (hideLoader = false) =>
        set((state) => ({
          activeLoaders: state.activeLoaders + 1,
          hideLoader,
        })),
      popLoader: () =>
        set((state) => ({
          activeLoaders: Math.max(state.activeLoaders - 1, 0),
          hideLoader: false,
        })),
      setIsFetching: (isFetching) => set({ isFetching }),
    }),
    'LoaderStore',
  ),
);
