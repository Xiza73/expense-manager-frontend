import { useNavigate } from '@tanstack/react-router';
import { Plus } from 'lucide-react';
import { useEffect } from 'react';

import { CustomTable } from '@/components/CustomTable/CustomTable';
import PageContainer from '@/components/PageContainer';
import { Button } from '@/components/ui/button';
import { INITIAL_PAGINATOR } from '@/contants/initial-paginator.constant';
import { usePagination } from '@/hooks/usePagination';

import {
  useGetAccountsQuery,
  useSetDefaultAccountMutation,
} from '../../queries/account.query';
import { getColumns } from './columns';

export const AccountsTable: React.FC = () => {
  const navigate = useNavigate();

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

  const {
    data: res,
    refetch,
    isFetching,
  } = useGetAccountsQuery({
    enabled: true,
    showLoading: false,
    params: {
      page: currentPage,
      limit: pageSize,
    },
  });

  const { data: defaultRes, mutateAsync: setDefaultAccount } =
    useSetDefaultAccountMutation();

  useEffect(() => {
    if (defaultRes?.success) {
      refetch();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultRes?.success]);

  const columns = getColumns(setDefaultAccount);

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

  const handleCreateAccount = () => {
    navigate({
      to: '/account/create',
    });
  };

  if (!res) return null;

  return (
    <PageContainer>
      <Button
        className="ml-auto"
        onClick={handleCreateAccount}
      >
        <Plus className="w-5 h-5" />
      </Button>
      <CustomTable
        data={res?.data || []}
        columns={columns}
        showSkeleton
        isFetching={isFetching}
        previousEnabled={previousEnabled}
        nextEnabled={nextEnabled}
        totalPages={totalPages}
        currentPage={currentPage}
        setPreviousPage={setPreviousPage}
        setNextPage={setNextPage}
        setPage={setPage}
      />
    </PageContainer>
  );
};
