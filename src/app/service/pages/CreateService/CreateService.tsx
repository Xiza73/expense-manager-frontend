import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

import { useCreateTransactionServiceMutation } from '@/app/transaction/queries/transaction-service.query';
import FormContainer from '@/components/FormContainer';
import FormInput from '@/components/FormInput';
import PageContainer from '@/components/PageContainer';

const formSchema = z.object({
  name: z.string().min(1),
});
type FormData = z.infer<typeof formSchema>;

export const CreateService: React.FC = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const { data: serviceCreated, mutateAsync: createService } =
    useCreateTransactionServiceMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
    delayError: 100,
    mode: 'onChange',
  });

  useEffect(() => {
    if (serviceCreated?.success) {
      navigate({
        to: '/service',
        replace: true,
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serviceCreated]);

  const onSubmit = async (data: FormData) => {
    await createService({
      ...data,
    });
  };

  return (
    <PageContainer>
      <FormContainer
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        title={t('create_service')}
        description={t('create_service_description')}
        buttonText={t('create_service')}
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
