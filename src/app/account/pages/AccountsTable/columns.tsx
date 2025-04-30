import { createColumnHelper } from '@tanstack/react-table';
import { Edit, SquareArrowOutUpRight, Star, Trash } from 'lucide-react';

import { cn } from '@/lib/utils';
import { patternMoney } from '@/utils/money-format.util';

import { Account } from '../../domain/account.interface';

const columnHelper = createColumnHelper<Account>();

interface ColumnsProps {
  t: (key: string) => string;
  setDefaultAccount: (id: string) => void;
  goToEdit: (id: string) => void;
  onDelete: (id: string) => void;
  showAccount: (id: string) => void;
}

export const getColumns = ({
  t,
  setDefaultAccount,
  goToEdit,
  onDelete,
  showAccount,
}: ColumnsProps) => [
  columnHelper.accessor('month', {
    header: t('month'),
    cell: (info) => t(info.getValue()),
  }),
  columnHelper.accessor('year', {
    header: t('year'),
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('balance', {
    header: t('balance'),
    cell: (info) =>
      patternMoney(info.getValue().toString(), {
        prefix: info.row.original.currency,
      }),
  }),
  columnHelper.accessor('amount', {
    header: t('amount'),
    cell: (info) =>
      patternMoney(info.getValue().toString(), {
        prefix: info.row.original.currency,
      }),
  }),
  columnHelper.accessor('id', {
    header: t('actions'),
    cell: (info) => {
      const id = info.getValue().toString();
      const isDefault = info.row.original.isDefault;

      return (
        <div className="w-full flex justify-end gap-2 items-center">
          <Star
            className={cn(
              'size-6',
              isDefault ? 'text-yellow-500 fill-current' : '',
              isDefault ? 'pointer-events-none' : 'cursor-pointer',
            )}
            onClick={() => {
              if (isDefault) return;

              setDefaultAccount(info.getValue().toString());
            }}
          />
          <SquareArrowOutUpRight
            onClick={() => showAccount(id)}
            className="cursor-pointer size-6"
          />
          <Edit
            onClick={() => goToEdit(id)}
            className="cursor-pointer size-6"
          />
          <Trash
            onClick={() => onDelete(id)}
            className="cursor-pointer size-6"
          />
        </div>
      );
    },
  }),
];
