import { useNavigate } from '@tanstack/react-router';
import { Plus } from 'lucide-react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { CustomTable } from '@/components/CustomTable/CustomTable';
import PageContainer from '@/components/PageContainer';
import { Button } from '@/components/ui/button';
import { INITIAL_PAGINATOR } from '@/contants/initial-paginator.constant';
import { usePagination } from '@/hooks/usePagination';
import { useModal } from '@/store/modal/useModal';

import {
  useDeleteAccountMutation,
  useGetAccountsQuery,
  useSetDefaultAccountMutation,
} from '../../queries/account.query';
import { getColumns } from './columns';

export const AccountsTable: React.FC = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const { openModal } = useModal();

  const {
    currentPage,
    nextEnabled,
    previousEnabled,
    pageSize,
    totalPages,
    setNextPage,
    setPreviousPage,
    setPage,
    setTotalPages,
    setPageSize,
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
  const { mutateAsync: deleteAccount } = useDeleteAccountMutation();

  useEffect(() => {
    if (defaultRes?.success) {
      refetch();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultRes?.success]);

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

  const goToEdit = (id: string) => {
    navigate({
      to: '/account/edit/$accountId',
      params: { accountId: id },
    });
  };

  const onDelete = (id: string) => {
    openModal({
      title: t('delete_account'),
      description: t('delete_account_description'),
      primaryLabel: t('delete'),
      primaryAction: async () => {
        await deleteAccount(id);
      },
    });
  };

  const showAccount = (id: string) => {
    navigate({
      to: '/account/$accountId',
      params: { accountId: id },
    });
  };

  const columns = getColumns({
    t,
    setDefaultAccount,
    goToEdit,
    onDelete,
    showAccount,
  });

  useEffect(() => {
    setPage(INITIAL_PAGINATOR.page);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageSize]);

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
        setLimit={setPageSize}
      />
    </PageContainer>
  );
};
