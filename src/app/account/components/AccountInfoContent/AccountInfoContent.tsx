import { useEffect } from 'react';

import { useGetTransactionsQuery } from '@/app/transaction/queries/transaction.query';
import { CustomTable } from '@/components/CustomTable/CustomTable';
import { INITIAL_PAGINATOR } from '@/contants/initial-paginator.constant';
import { usePagination } from '@/hooks/usePagination';

import { Account } from '../../domain/account.interface';
import { columns } from './columns';

export interface AccountInfoContentProps {
  account: Account;
}

export const AccountInfoContent: React.FC<AccountInfoContentProps> = ({
  account,
}) => {
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

  const { data: res, refetch } = useGetTransactionsQuery({
    enabled: Boolean(account?.id),
    showLoading: false,
    params: {
      page: currentPage,
      limit: pageSize,
      accountId: account?.id,
    },
  });

  useEffect(() => {
    setTotalPages(res?.pages || 1);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [res?.pages]);

  useEffect(() => {
    if (res?.data?.length) {
      refetch();
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
      setPreviousPage={setPreviousPage}
      setNextPage={setNextPage}
      setPage={setPage}
    />
  );
};
