import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useParams, useSearch } from '@tanstack/react-router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

import { useUpdateTransactionServiceMutation } from '@/app/transaction/queries/transaction-service.query';
import FormInput from '@/components/FormInput';
import PageContainer from '@/components/PageContainer';
import { Text } from '@/components/ui/text';

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
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col items-center justify-center w-full h-full p-4 space-y-4">
          <Text
            as="h1"
            className="text-center"
          >
            {t('edit_service')}
          </Text>
          <Text
            as="p"
            className="text-center"
          >
            {t('edit_service_description')}
          </Text>

          <FormInput
            register={register}
            name="name"
            placeholder={t('name')}
            error={errors.name?.message}
          />
        </div>
        <div className="flex justify-center w-full p-4 mt-2 bg-gray-100">
          <button
            type="submit"
            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            {t('edit_service')}
          </button>
        </div>
      </form>
    </PageContainer>
  );
};
