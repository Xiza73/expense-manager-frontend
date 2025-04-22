import { createColumnHelper } from '@tanstack/react-table';

import { Account } from '../../domain/account.interface';

const columnHelper = createColumnHelper<Account>();

export const columns = [
  columnHelper.accessor('month', {
    header: 'Month',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('year', {
    header: 'Year',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('currency', {
    header: 'Currency',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('amount', {
    header: 'Amount',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('balance', {
    header: 'Balance',
    cell: (info) => info.getValue(),
  }),
];
