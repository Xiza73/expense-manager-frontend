import { useNavigate } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  GetTransactionsFieldOrder,
  GetTransactionsRequest,
} from '@/app/transaction/domain/requests/get-transactions.request';
import {
  useDeleteTransactionMutation,
  useGetTransactionsQuery,
  usePayDebtLoanTransactionMutation,
} from '@/app/transaction/queries/transaction.query';
import { CustomTable } from '@/components/CustomTable/CustomTable';
import { INITIAL_PAGINATOR } from '@/contants/initial-paginator.constant';
import { getNextOrder, Order } from '@/domain/order.enum';
import { usePagination } from '@/hooks/usePagination';
import { useModal } from '@/store/modal/useModal';

import { Account } from '../../domain/account.interface';
import { getColumns } from './columns';

export interface AccountInfoContentProps {
  account: Account;
  redirect?: 'main' | 'custom';
}

export const AccountInfoContent: React.FC<AccountInfoContentProps> = ({
  account,
  redirect,
}) => {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const { openModal } = useModal();

  const { mutateAsync: payDebtLoanTransaction } =
    usePayDebtLoanTransactionMutation();
  const { mutateAsync: deleteTransaction } = useDeleteTransactionMutation();

  const payDebtLoan = (id: string, title: string) => {
    openModal({
      title,
      description: t('pay_debt_loan_description'),
      primaryLabel: title,
      primaryAction: async () => {
        await payDebtLoanTransaction(id);
      },
    });
  };

  const goToEdit = (id: string) => {
    navigate({
      to: '/transaction/edit/$transactionId',
      params: { transactionId: id },
      search: {
        ...(redirect === 'main' && { redirect }),
      },
    });
  };

  const onDelete = (id: string) => {
    openModal({
      title: t('delete_transaction'),
      description: t('delete_transaction_description'),
      primaryLabel: t('delete'),
      primaryAction: async () => {
        await deleteTransaction(id);
      },
    });
  };

  const {
    currentPage,
    nextEnabled,
    previousEnabled,
    pageSize,
    setNextPage,
    setPreviousPage,
    setPage,
    setTotalPages,
    setPageSize,
    totalPages,
  } = usePagination({
    initialPage: INITIAL_PAGINATOR.page,
    initialPageSize: INITIAL_PAGINATOR.limit,
  });

  const [search, setSearch] = useState<GetTransactionsRequest>({
    accountId: account.id,
  });

  const handleSearch = (value: GetTransactionsFieldOrder, order?: Order) => {
    if (search.fieldOrder !== value) {
      setSearch((prev) => ({
        ...prev,
        fieldOrder: value,
        order: Order.ASC,
      }));

      return;
    }

    const newOrder = getNextOrder(order || 'NULL');
    const fieldOrder = newOrder ? value : undefined;

    setSearch((prev) => ({
      ...prev,
      fieldOrder,
      order: newOrder,
    }));
  };

  const handleGetColumns = () =>
    getColumns({
      fieldOrder: search.fieldOrder,
      order: search.order,
      payDebtLoan,
      goToEdit,
      onDelete,
      handleSearch,
      t,
    });

  const [columns, setColumns] = useState(handleGetColumns());

  const {
    data: res,
    isFetching,
    refetch,
  } = useGetTransactionsQuery({
    enabled: Boolean(account?.id),
    showLoading: false,
    params: {
      page: currentPage,
      limit: pageSize,
      ...search,
    },
  });

  useEffect(() => {
    if (!res?.data?.length) {
      refetch();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setTotalPages(res?.pages || 1);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [res?.pages]);

  useEffect(() => {
    setPage(INITIAL_PAGINATOR.page);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageSize]);

  useEffect(() => {
    if (res?.data?.length) {
      refetch();

      setColumns(handleGetColumns());
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, pageSize, search]);

  if (!res) return null;

  return (
    <CustomTable
      data={res?.data || []}
      columns={columns}
      previousEnabled={previousEnabled}
      nextEnabled={nextEnabled}
      totalPages={totalPages}
      currentPage={currentPage}
      isFetching={isFetching}
      limit={pageSize}
      setPreviousPage={setPreviousPage}
      setNextPage={setNextPage}
      setPage={setPage}
      setLimit={setPageSize}
    />
  );
};
