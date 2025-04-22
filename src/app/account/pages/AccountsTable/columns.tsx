import { Link } from '@tanstack/react-router';
import { createColumnHelper } from '@tanstack/react-table';
import { SquareArrowOutUpRight } from 'lucide-react';

import { AppRoute } from '@/domain/app-route.type';
import { patternMoney } from '@/utils/money-format.util';

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
  columnHelper.accessor('balance', {
    header: 'Balance',
    cell: (info) =>
      patternMoney(info.getValue().toString(), {
        prefix: info.row.original.currency,
      }),
  }),
  columnHelper.accessor('amount', {
    header: 'Amount',
    cell: (info) =>
      patternMoney(info.getValue().toString(), {
        prefix: info.row.original.currency,
      }),
  }),
  columnHelper.accessor('id', {
    header: 'Go to',
    cell: (info) => {
      const link = `/account/${info.getValue()}` as AppRoute;

      return (
        <Link to={link}>
          <SquareArrowOutUpRight className="ml-auto" />
        </Link>
      );
    },
  }),
];
