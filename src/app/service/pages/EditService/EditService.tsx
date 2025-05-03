import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useParams, useSearch } from '@tanstack/react-router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

import { useUpdateTransactionServiceMutation } from '@/app/transaction/queries/transaction-service.query';
import FormContainer from '@/components/FormContainer';
import FormInput from '@/components/FormInput';
import PageContainer from '@/components/PageContainer';

const formSchema = z.object({
  name: z.string().min(1),
});
type FormData = z.infer<typeof formSchema>;

export const EditService: React.FC = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const { serviceId } = useParams({
    from: '/service/edit/$serviceId',
  });

  const { name } = useSearch({ from: '/service/edit/$serviceId' });

  const { data: serviceUpdated, mutateAsync: updateService } =
    useUpdateTransactionServiceMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name,
    },
    delayError: 100,
    mode: 'onChange',
  });

  useEffect(() => {
    if (serviceUpdated?.success) {
      navigate({
        to: '/service',
        replace: true,
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serviceUpdated]);

  const onSubmit = async (data: FormData) => {
    await updateService({
      ...data,
      id: serviceId,
    });
  };

  return (
    <PageContainer>
      <FormContainer
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        title={t('edit_service')}
        description={t('edit_service_description')}
        buttonText={t('edit_service')}
      >
        <FormInput
          register={register}
          name="name"
          placeholder={t('name')}
          error={errors.name?.message}
        />
      </FormContainer>
    </PageContainer>
  );
};
