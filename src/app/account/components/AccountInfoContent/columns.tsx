import { createColumnHelper } from '@tanstack/react-table';
import { BanknoteArrowDown, BanknoteArrowUp, Edit, Trash } from 'lucide-react';

import { GetTransactionsFieldOrder } from '@/app/transaction/domain/requests/get-transactions.request';
import { Transaction } from '@/app/transaction/domain/transaction.interface';
import { TransactionType } from '@/app/transaction/domain/transaction-type.enum';
import OrderArea from '@/components/OrderArea';
import TruncateTooltipText from '@/components/TruncateTooltipText';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Order } from '@/domain/order.enum';
import { getDate } from '@/utils/date.util';
import { patternMoney } from '@/utils/money-format.util';

const columnHelper = createColumnHelper<Transaction>();

interface ColumnsProps {
  order?: Order;
  fieldOrder?: GetTransactionsFieldOrder;
  t: (key: string) => string;
  goToEdit: (id: string) => void;
  onDelete: (id: string) => void;
  handleSearch: (value: GetTransactionsFieldOrder, order?: Order) => void;
}

export const getColumns = ({
  order,
  fieldOrder,
  t,
  goToEdit,
  onDelete,
  handleSearch,
}: ColumnsProps) => [
  columnHelper.accessor('date', {
    header: () => (
      <OrderArea
        label={t('date')}
        fieldOrder={fieldOrder}
        currentField={GetTransactionsFieldOrder.DATE}
        order={order}
        handleSearch={handleSearch}
      />
    ),
    meta: {
      isSortable: true,
    },
    cell: (info) => getDate(info.getValue()),
  }),
  columnHelper.accessor('name', {
    header: () => (
      <OrderArea
        label={t('name')}
        fieldOrder={fieldOrder}
        currentField={GetTransactionsFieldOrder.NAME}
        order={order}
        handleSearch={handleSearch}
      />
    ),
    meta: {
      isSortable: true,
    },
    cell: (info) => <TruncateTooltipText text={info.getValue()} />,
  }),
  columnHelper.accessor('description', {
    header: t('description'),
    cell: (info) => <TruncateTooltipText text={info.getValue() || ''} />,
  }),
  columnHelper.accessor('category.name', {
    header: () => (
      <OrderArea
        label={t('category')}
        fieldOrder={fieldOrder}
        currentField={GetTransactionsFieldOrder.CATEGORY}
        order={order}
        handleSearch={handleSearch}
      />
    ),
    meta: {
      isSortable: true,
    },
    cell: (info) => t(info.getValue()),
  }),
  columnHelper.accessor('service.name', {
    header: () => (
      <OrderArea
        label={t('service')}
        fieldOrder={fieldOrder}
        currentField={GetTransactionsFieldOrder.SERVICE}
        order={order}
        handleSearch={handleSearch}
      />
    ),
    meta: {
      isSortable: true,
    },
    cell: (info) => t(info.getValue()),
  }),
  columnHelper.accessor('paymentMethod', {
    header: () => (
      <OrderArea
        label={t('with')}
        fieldOrder={fieldOrder}
        currentField={GetTransactionsFieldOrder.PAYMENT_METHOD}
        order={order}
        handleSearch={handleSearch}
      />
    ),
    meta: {
      isSortable: true,
    },
    cell: (info) => t(info.getValue()),
  }),
  columnHelper.accessor('type', {
    header: () => (
      <OrderArea
        label={t('type')}
        fieldOrder={fieldOrder}
        currentField={GetTransactionsFieldOrder.TYPE}
        order={order}
        handleSearch={handleSearch}
      />
    ),
    meta: {
      isSortable: true,
    },
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
    header: () => (
      <OrderArea
        label={t('amount')}
        fieldOrder={fieldOrder}
        currentField={GetTransactionsFieldOrder.AMOUNT}
        order={order}
        handleSearch={handleSearch}
      />
    ),
    meta: {
      isSortable: true,
    },
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
