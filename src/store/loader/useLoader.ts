import { useShallow } from 'zustand/react/shallow';

import { useLoaderStore } from './useLoaderStore';

export const useLoader = () => {
  const {
    activeLoaders,
    isFetching,
    hideLoader,
    pushLoader,
    popLoader,
    setIsFetching,
  } = useLoaderStore(useShallow((state) => state));

  return {
    activeLoaders,
    isFetching,
    hideLoader,
    pushLoader,
    popLoader,
    setIsFetching,
  };
};
