import { createColumnHelper } from '@tanstack/react-table';
import {
  BanknoteArrowDown,
  BanknoteArrowUp,
  Coins,
  Edit,
  HandCoins,
  Handshake,
  Trash,
} from 'lucide-react';

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
import { cn } from '@/lib/utils';
import { getDate } from '@/utils/date.util';
import { patternMoney } from '@/utils/money-format.util';

const columnHelper = createColumnHelper<Transaction>();

interface ColumnsProps {
  order?: Order;
  fieldOrder?: GetTransactionsFieldOrder;
  t: (key: string) => string;
  payDebtLoan: (id: string, title: string) => void;
  goToEdit: (id: string) => void;
  onDelete: (id: string) => void;
  handleSearch: (value: GetTransactionsFieldOrder, order?: Order) => void;
}

const TransactionTypeIcon = {
  [TransactionType.EXPENSE]: <BanknoteArrowDown className="text-red-500" />,
  [TransactionType.INCOME]: <BanknoteArrowUp className="text-green-500" />,
  [TransactionType.DEBT]: <HandCoins className="text-red-500" />,
  [TransactionType.LOAN]: <Handshake className="text-green-500" />,
};

export const getColumns = ({
  order,
  fieldOrder,
  t,
  payDebtLoan,
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
    cell: (info) => {
      const lineThrough =
        info.row.original.isDebtLoan && info.row.original.isPaid;

      return (
        <div className={cn(lineThrough && 'text-paid')}>
          {getDate(info.getValue())}
        </div>
      );
    },
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
    cell: (info) => (
      <TruncateTooltipText
        text={info.getValue()}
        lineThrough={info.row.original.isDebtLoan && info.row.original.isPaid}
      />
    ),
  }),
  columnHelper.accessor('description', {
    header: t('description'),
    cell: (info) => (
      <TruncateTooltipText
        text={info.getValue() || ''}
        lineThrough={info.row.original.isDebtLoan && info.row.original.isPaid}
      />
    ),
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
    cell: (info) => {
      const lineThrough =
        info.row.original.isDebtLoan && info.row.original.isPaid;

      return (
        <div className={cn(lineThrough && 'text-paid')}>
          {t(info.getValue())}
        </div>
      );
    },
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
    cell: (info) => t(info.getValue() || ''),
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
    cell: (info) => {
      const lineThrough =
        info.row.original.isDebtLoan && info.row.original.isPaid;

      return (
        <div className={cn(lineThrough && 'text-paid')}>
          {t(info.getValue())}
        </div>
      );
    },
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
      const lineThrough =
        info.row.original.isDebtLoan && info.row.original.isPaid;

      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger
              className={cn(lineThrough && 'text-paid')}
            >
              {TransactionTypeIcon[info.getValue()]}
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
    cell: (info) => {
      const lineThrough =
        info.row.original.isDebtLoan && info.row.original.isPaid;

      return (
        <div className={cn(lineThrough && 'text-paid')}>
          {patternMoney(info.getValue().toString(), {
            prefix: info.row.original.currency,
          })}
        </div>
      );
    },
  }),
  columnHelper.accessor('id', {
    header: t('actions'),
    cell: (info) => {
      const id = info.getValue().toString();
      const isDebtOrLoan = Array.of<string>(
        TransactionType.DEBT,
        TransactionType.LOAN,
      ).includes(info.row.original.type);
      const title =
        info.row.original.type === TransactionType.DEBT
          ? t('pay_debt')
          : t('pay_loan');

      if (info.row.original.isDebtLoan && info.row.original.isPaid) return null;

      return (
        <div className="w-full flex justify-end gap-2">
          {isDebtOrLoan && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Coins
                    onClick={() => payDebtLoan(id, title)}
                    className="cursor-pointer"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{title}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
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
