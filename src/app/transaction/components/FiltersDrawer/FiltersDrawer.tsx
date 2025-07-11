import { zodResolver } from '@hookform/resolvers/zod';
import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog';
import { Filter } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

import FormContainer from '@/components/FormContainer';
import FormInput from '@/components/FormInput';
import FormSelect from '@/components/FormSelect';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { commonValidators } from '@/contants/common-validators.constant';
import { PaymentMethod, PaymentMethodKey } from '@/domain/payment-method.enum';
import { useTransactionSearch } from '@/store/transactionSearch/useTransactionSearch';

import {
  TransactionType,
  TransactionTypeKey,
} from '../../domain/transaction-type.enum';
import { useGetTransactionCategoriesQuery } from '../../queries/transaction-category.query';
import { useGetTransactionServicesQuery } from '../../queries/transaction-service.query';

const formSchema = z.object({
  // date: commonValidators.date,
  nameDescription: commonValidators.optionalMinCharacters(3),
  categoryId: commonValidators.optionalId('Category'),
  serviceId: commonValidators.optionalId('Service'),
  type: commonValidators.optionalTransactionType,
  paymentMethod: commonValidators.optionalPaymentMethod,
});
type FormSchema = z.infer<typeof formSchema>;

export const FiltersDrawer: React.FC = () => {
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);
  const { search, setSearch } = useTransactionSearch();

  const { data: transactionCategories } = useGetTransactionCategoriesQuery();
  const { data: transactionServices } = useGetTransactionServicesQuery();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    delayError: 100,
    mode: 'onChange',
    defaultValues: {
      nameDescription: search.search || '',
      categoryId: search.categoryId?.toString() || '',
      serviceId: search.serviceId?.toString() || '',
      type: search.type || undefined,
      paymentMethod: search.paymentMethod || undefined,
    },
  });

  const onSubmit = async (data: FormSchema) => {
    const { nameDescription, categoryId, serviceId, type, paymentMethod } =
      data;

    setSearch({
      ...search,
      search: nameDescription || undefined,
      categoryId: categoryId ? Number(categoryId) : undefined,
      serviceId: serviceId ? Number(serviceId) : undefined,
      type: type ? (type as TransactionTypeKey) : undefined,
      paymentMethod: paymentMethod
        ? (paymentMethod as PaymentMethodKey)
        : undefined,
    });

    setOpen(false);
  };

  return (
    <Drawer
      open={open}
      onOpenChange={setOpen}
    >
      <DrawerTrigger asChild>
        <Button>
          <Filter className="w-5 h-5" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="sm:max-w-[425px] right-0 pb-4">
        <div className="mx-auto w-full max-w-sm">
          <DialogTitle></DialogTitle>
          <DialogDescription></DialogDescription>
          <FormContainer
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            title={t('filters')}
            buttonText={t('apply')}
            withoutButtonBackground
          >
            <FormInput
              register={register}
              name="nameDescription"
              placeholder={t('name_description')}
              error={errors.nameDescription?.message}
            />

            <FormSelect
              control={control}
              name="categoryId"
              placeholder={t('select_category')}
              error={errors.categoryId?.message}
              enabledDefault
              options={(transactionCategories || []).map((category) => ({
                value: category.id.toString(),
                label: t(category.name),
              }))}
            />

            <FormSelect
              control={control}
              name="serviceId"
              placeholder={t('select_service')}
              error={errors.serviceId?.message}
              enabledDefault
              options={(transactionServices || []).map((service) => ({
                value: service.id.toString(),
                label: t(service.name),
              }))}
            />

            <FormSelect
              control={control}
              name="type"
              placeholder={t('select_transaction_type')}
              error={errors.type?.message}
              enabledDefault
              options={Object.values(TransactionTypeKey).map((type) => ({
                value: type,
                label: t(TransactionType[type]),
              }))}
            />

            <FormSelect
              control={control}
              name="paymentMethod"
              placeholder={t('select_payment_method')}
              error={errors.paymentMethod?.message}
              enabledDefault
              options={Object.values(PaymentMethodKey).map((method) => ({
                value: method,
                label: t(PaymentMethod[method]),
              }))}
            />
          </FormContainer>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
