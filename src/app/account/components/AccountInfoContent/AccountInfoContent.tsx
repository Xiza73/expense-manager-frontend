import { useNavigate } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { GetTransactionsFieldOrder } from '@/app/transaction/domain/requests/get-transactions.request';
import {
  useDeleteTransactionMutation,
  useGetTransactionsQuery,
} from '@/app/transaction/queries/transaction.query';
import { CustomTable } from '@/components/CustomTable/CustomTable';
import { INITIAL_PAGINATOR } from '@/contants/initial-paginator.constant';
import { getNextOrder, Order } from '@/domain/order.enum';
import { usePagination } from '@/hooks/usePagination';
import { useModal } from '@/store/modal/useModal';
import { useTransactionSearch } from '@/store/transactionSearch/useTransactionSearch';

import { Account } from '../../domain/account.interface';
import { getColumns } from './columns';
import PartialPaymentModal from './PartialPaymentModal';

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
  const { openModal, closeModal } = useModal();

  const { mutateAsync: deleteTransaction } = useDeleteTransactionMutation();

  const payDebtLoan = (
    id: string,
    title: string,
    transactionDescription: string,
  ) => {
    openModal({
      component: (
        <PartialPaymentModal
          id={id}
          title={title}
          currency={account.currency}
          transactionDescription={transactionDescription}
          closeModal={closeModal}
        />
      ),
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

  const { search, setSearch } = useTransactionSearch();

  useEffect(() => {
    setSearch({
      accountId: account.id,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account.id]);

  const handleSearch = (value: GetTransactionsFieldOrder, order?: Order) => {
    if (search.fieldOrder !== value) {
      setSearch({
        ...search,
        fieldOrder: value,
        order: Order.ASC,
      });

      return;
    }

    const newOrder = getNextOrder(order || 'NULL');
    const fieldOrder = newOrder ? value : undefined;

    setSearch({
      ...search,
      fieldOrder,
      order: newOrder,
    });
  };

  const handleGetColumns = () =>
    getColumns({
      fieldOrder: search.fieldOrder,
      order: search.order,
      currency: account?.currency,
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
    enabled: Boolean(search.accountId),
    showLoading: false,
    params: {
      page: currentPage,
      limit: pageSize,
      ...search,
    },
  });

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
  }, [currentPage, pageSize]);

  useEffect(() => {
    if (!search.accountId) return;

    refetch();

    setColumns(handleGetColumns());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

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
