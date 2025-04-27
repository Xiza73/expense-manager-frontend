import { useNavigate } from '@tanstack/react-router';
import { useEffect, useState } from 'react';

import {
  useDeleteTransactionMutation,
  useGetTransactionsQuery,
} from '@/app/transaction/queries/transaction.query';
import { CustomTable } from '@/components/CustomTable/CustomTable';
import { INITIAL_PAGINATOR } from '@/contants/initial-paginator.constant';
import { usePagination } from '@/hooks/usePagination';
import { useModal } from '@/store/modal/useModal';

import { Account } from '../../domain/account.interface';
import { getColumns } from './columns';

export interface AccountInfoContentProps {
  account: Account;
}

export const AccountInfoContent: React.FC<AccountInfoContentProps> = ({
  account,
}) => {
  const navigate = useNavigate();
  const { openModal } = useModal();

  const { mutateAsync: deleteTransaction } = useDeleteTransactionMutation();

  const goToEdit = (id: string) => {
    navigate({
      to: '/transaction/edit/$transactionId',
      params: { transactionId: id },
    });
  };

  const onDelete = (id: string) => {
    openModal({
      title: 'Delete Transaction',
      description: 'Are you sure you want to delete this transaction?',
      primaryLabel: 'Delete',
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
    totalPages,
  } = usePagination({
    initialPage: INITIAL_PAGINATOR.page,
    initialPageSize: INITIAL_PAGINATOR.limit,
  });

  const [columns, setColumns] = useState(getColumns({ goToEdit, onDelete }));

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
      accountId: account?.id,
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
    if (res?.data?.length) {
      refetch();

      setColumns(getColumns({ goToEdit, onDelete }));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, pageSize]);

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
    />
  );
};
