import { useSuspenseQuery } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import {
  getTransactionServicesQueryOptions,
  useDeleteTransactionServiceMutation,
} from '@/app/transaction/queries/transaction-service.query';
import { CustomTable } from '@/components/CustomTable/CustomTable';
import PageContainer from '@/components/PageContainer';
import { Button } from '@/components/ui/button';
import { useModal } from '@/store/modal/useModal';

import { getColumns } from './columns';

export const ServicesTable: React.FC = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const { openModal } = useModal();

  const { data: services, isFetching } = useSuspenseQuery(
    getTransactionServicesQueryOptions(),
  );

  const { mutateAsync: deleteService } = useDeleteTransactionServiceMutation();

  const handleCreateService = () => {
    navigate({
      to: '/service/create',
    });
  };

  const goToEdit = (id: string, name: string) => {
    navigate({
      to: '/service/edit/$serviceId',
      params: { serviceId: id },
      search: {
        name,
      },
    });
  };

  const onDelete = (id: string) => {
    openModal({
      title: t('delete_service'),
      description: t('delete_service_description'),
      primaryLabel: t('delete'),
      primaryAction: async () => {
        await deleteService(id);
      },
    });
  };

  const columns = getColumns({
    t,
    goToEdit,
    onDelete,
  });

  if (!services) return null;

  return (
    <PageContainer>
      <Button
        className="ml-auto"
        onClick={handleCreateService}
      >
        <Plus className="w-5 h-5" />
      </Button>
      <CustomTable
        data={services || []}
        columns={columns}
        showSkeleton
        isFetching={isFetching}
        totalPages={1}
        currentPage={1}
        withPagination={false}
      />
    </PageContainer>
  );
};
