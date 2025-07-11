import _ from 'lodash';
import { create } from 'zustand';

import { logger } from '../logger';
import {
  TransactionSearchState,
  TransactionSearchStore,
} from './transaction-search.model';

const initialState: Pick<TransactionSearchStore, keyof TransactionSearchState> =
  {};

export const useTransactionSearchStore = create<TransactionSearchStore>()(
  logger<TransactionSearchStore>(
    (set) => ({
      ...initialState,
      setTransactionSearch: (data) => {
        const isSameSearch = _.isEqual(data, initialState.search);

        if (isSameSearch) set((_) => ({ isSameSearch }));

        set((_) => ({
          search: data,
          isSameSearch,
        }));
      },
    }),
    'TransactionSearchStore',
  ),
);
