import { useShallow } from 'zustand/react/shallow';

import { useErrorStore } from './useErrorStore';

export const useError = () => {
  const { error, setError, setErrorCallback } = useErrorStore(
    useShallow((state) => state),
  );

  return {
    error,
    setError,
    setErrorCallback,
  };
};
