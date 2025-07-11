import { useShallow } from 'zustand/react/shallow';

import { useTransactionSearchStore } from './useTransactionSearchStore';

export const useTransactionSearch = () => {
  const { setTransactionSearch, search } = useTransactionSearchStore(
    useShallow((state) => state),
  );

  return {
    search: search || {},
    setSearch: setTransactionSearch,
  };
};
