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
import ShowHideEye from '@/components/ShowHideEye';
import TruncateTooltipText from '@/components/TruncateTooltipText';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Currency } from '@/domain/currency.enum';
import { Order } from '@/domain/order.enum';
import { cn } from '@/lib/utils';
import { getDate } from '@/utils/date.util';
import { patternMoney } from '@/utils/money-format.util';

const columnHelper = createColumnHelper<Transaction>();

interface ColumnsProps {
  order?: Order;
  fieldOrder?: GetTransactionsFieldOrder;
  currency: Currency;
  t: (key: string) => string;
  payDebtLoan: (
    id: string,
    title: string,
    transactionDescription: string,
  ) => void;
  goToEdit: (id: string) => void;
  onDelete: (id: string) => void;
  handleSearch: (value: GetTransactionsFieldOrder, order?: Order) => void;
}

const TransactionTypeIcon = {
  [TransactionType.EXPENSE]: {
    Icon: BanknoteArrowDown,
    color: 'text-red-500',
  },
  [TransactionType.INCOME]: {
    Icon: BanknoteArrowUp,
    color: 'text-green-500',
  },
  [TransactionType.DEBT]: {
    Icon: HandCoins,
    color: 'text-red-500',
  },
  [TransactionType.LOAN]: {
    Icon: Handshake,
    color: 'text-green-500',
  },
} as const;
type TransactionTypeIconKey = keyof typeof TransactionTypeIcon;

const transactionTypeIconHandler = (
  type: TransactionTypeIconKey,
  disabled?: boolean,
) => {
  const component = TransactionTypeIcon[type];
  const Icon = component.Icon;
  const color = disabled ? 'text-paid' : component.color;

  return <Icon className={cn(color)} />;
};

export const getColumns = ({
  order,
  fieldOrder,
  currency,
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
            <TooltipTrigger className={cn(lineThrough && 'text-paid')}>
              {transactionTypeIconHandler(info.getValue(), lineThrough)}
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
    footer: (info) => {
      const total = info.table
        .getFilteredRowModel()
        .rows.reduce((acc, row) => acc + (row.getValue('amount') as number), 0);

      const value = patternMoney(total.toString(), {
        prefix: currency,
      });

      return <ShowHideEye text={value} />;
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
      const description = info.row.original.description || '';

      if (info.row.original.isDebtLoan && info.row.original.isPaid) return null;

      return (
        <div className="w-full flex justify-end gap-2">
          {isDebtOrLoan && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Coins
                    onClick={() => payDebtLoan(id, title, description)}
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
