import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@radix-ui/react-tooltip';
import { Link } from '@tanstack/react-router';
import { createColumnHelper } from '@tanstack/react-table';
import { BanknoteArrowDown, BanknoteArrowUp, Edit } from 'lucide-react';

import { Transaction } from '@/app/transaction/domain/transaction.interface';
import { TransactionType } from '@/app/transaction/domain/transaction-type.enum';
import { AppRoute } from '@/domain/app-route.type';
import { getDate } from '@/utils/date.util';
import { patternMoney } from '@/utils/money-format.util';

const columnHelper = createColumnHelper<Transaction>();

export const getColumns = (_currentPage: number, _pageSize: number) => [
  columnHelper.accessor('date', {
    header: 'Date',
    cell: (info) => getDate(info.getValue()),
  }),
  // columnHelper.accessor('category.id', {
  //   header: '#',
  //   cell: (info) => info.row.index + 1 + (currentPage - 1) * pageSize,
  // }),
  columnHelper.accessor('name', {
    header: 'Name',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('description', {
    header: 'Description',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('category.name', {
    header: 'Category',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('service.name', {
    header: 'Service',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('paymentMethod', {
    header: 'Payment Method',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('type', {
    header: 'Type',
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
              <p>{info.getValue()}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
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
      const editLink = `/transaction/${info.getValue()}` as AppRoute;

      return (
        <>
          <Link to={editLink}>
            <Edit className="ml-auto" />
          </Link>
        </>
      );
    },
  }),
];
