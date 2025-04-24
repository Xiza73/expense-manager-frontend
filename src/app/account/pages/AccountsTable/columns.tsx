import { Link } from '@tanstack/react-router';
import { createColumnHelper } from '@tanstack/react-table';
import { SquareArrowOutUpRight, Star } from 'lucide-react';

import { AppRoute } from '@/domain/app-route.type';
import { cn } from '@/lib/utils';
import { patternMoney } from '@/utils/money-format.util';

import { Account } from '../../domain/account.interface';

const columnHelper = createColumnHelper<Account>();

export const getColumns = (setDefaultAccount: (id: string) => void) => [
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
    header: 'Actions',
    cell: (info) => {
      const link = `/account/${info.getValue()}` as AppRoute;
      const isDefault = info.row.original.isDefault;

      return (
        <div className="w-full flex justify-end gap-2">
          <Star
            className={cn(
              isDefault ? 'text-yellow-500 fill-current' : '',
              isDefault ? 'pointer-events-none' : 'cursor-pointer',
            )}
            onClick={() => {
              if (isDefault) return;

              setDefaultAccount(info.getValue().toString());
            }}
          />
          <Link to={link}>
            <SquareArrowOutUpRight />
          </Link>
        </div>
      );
    },
  }),
];
