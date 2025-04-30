import { createColumnHelper } from '@tanstack/react-table';
import { BanknoteArrowDown, BanknoteArrowUp, Edit, Trash } from 'lucide-react';

import { Transaction } from '@/app/transaction/domain/transaction.interface';
import { TransactionType } from '@/app/transaction/domain/transaction-type.enum';
import TruncateTooltipText from '@/components/TruncateTooltipText';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { getDate } from '@/utils/date.util';
import { patternMoney } from '@/utils/money-format.util';

const columnHelper = createColumnHelper<Transaction>();

interface ColumnsProps {
  t: (key: string) => string;
  goToEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export const getColumns = ({ goToEdit, onDelete, t }: ColumnsProps) => [
  columnHelper.accessor('date', {
    header: t('date'),
    cell: (info) => getDate(info.getValue()),
  }),
  // columnHelper.accessor('category.id', {
  //   header: '#',
  //   cell: (info) => info.row.index + 1 + (currentPage - 1) * pageSize,
  // }),
  columnHelper.accessor('name', {
    header: t('name'),
    cell: (info) => <TruncateTooltipText text={info.getValue()} />,
  }),
  columnHelper.accessor('description', {
    header: t('description'),
    cell: (info) => <TruncateTooltipText text={info.getValue() || ''} />,
  }),
  columnHelper.accessor('category.name', {
    header: t('category'),
    cell: (info) => t(info.getValue()),
  }),
  columnHelper.accessor('service.name', {
    header: t('service'),
    cell: (info) => t(info.getValue()),
  }),
  columnHelper.accessor('paymentMethod', {
    header: t('with'),
    cell: (info) => t(info.getValue()),
  }),
  columnHelper.accessor('type', {
    header: t('type'),
    cell: (info) => {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              {info.getValue() === TransactionType.EXPENSE ? (
                <BanknoteArrowDown className="text-red-500" />
              ) : (
                <BanknoteArrowUp className="text-green-500" />
              )}
            </TooltipTrigger>
            <TooltipContent>
              <p>{t(info.getValue())}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
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

      return (
        <div className="w-full flex justify-end gap-2">
          <Edit
            onClick={() => goToEdit(id)}
            className="cursor-pointer"
          />
          <Trash
            onClick={() => onDelete(id)}
            className="cursor-pointer"
          />
        </div>
      );
    },
  }),
];
