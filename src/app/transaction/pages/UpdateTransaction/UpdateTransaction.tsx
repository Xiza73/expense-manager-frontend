import { zodResolver } from '@hookform/resolvers/zod';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useNavigate, useParams, useSearch } from '@tanstack/react-router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

import { getAccountQueryOptions } from '@/app/account/queries/account.query';
import FormContainer from '@/components/FormContainer';
import FormDate from '@/components/FormDate';
import FormInput from '@/components/FormInput';
import FormMoney from '@/components/FormMoney';
import FormSelect from '@/components/FormSelect';
import PageContainer from '@/components/PageContainer';
import { commonValidators } from '@/contants/common-validators.constant';
import { getCurrencyKey } from '@/domain/currency.enum';
import {
  getPaymentMethodKey,
  PaymentMethod,
  PaymentMethodKey,
} from '@/domain/payment-method.enum';
import { getOnlyDate } from '@/utils/date.util';
import { handleMoneyInput, moneyToNumber } from '@/utils/money-format.util';

import {
  getTransactionTypeKey,
  TransactionType,
  TransactionTypeKey,
} from '../../domain/transaction-type.enum';
import {
  getTransactionQueryOptions,
  useUpdateTransactionMutation,
} from '../../queries/transaction.query';
import { useGetTransactionCategoriesQuery } from '../../queries/transaction-category.query';
import { useGetTransactionServicesQuery } from '../../queries/transaction-service.query';

const formSchema = z.object({
  name: commonValidators.minCharacters(3),
  description: z.string().optional(),
  amount: commonValidators.money,
  currency: commonValidators.currency,
  type: commonValidators.transactionType,
  paymentMethod: commonValidators.paymentMethod,
  date: commonValidators.date,
  categoryId: commonValidators.id('Category'),
  serviceId: commonValidators.id('Service'),
  accountId: commonValidators.id('Account'),
});
type FormSchema = z.infer<typeof formSchema>;

export const UpdateTransaction: React.FC = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const { transactionId } = useParams({
    from: '/transaction/edit/$transactionId',
  });
  const { redirect } = useSearch({ from: '/transaction/edit/$transactionId' });

  const { data: transaction } = useSuspenseQuery(
    getTransactionQueryOptions(transactionId),
  );
  const { data: account } = useSuspenseQuery(
    getAccountQueryOptions(transaction?.account.id.toString()),
  );
  const { data: transactionUpdated, mutateAsync: updateTransaction } =
    useUpdateTransactionMutation();
  const { data: transactionCategories } = useGetTransactionCategoriesQuery();
  const { data: transactionServices } = useGetTransactionServicesQuery();

  const dateNow = new Date();
  const isSameMonthAndYear =
    dateNow.getMonth() === account?.date.getMonth() &&
    dateNow.getFullYear() === account?.date.getFullYear();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: transaction?.name ?? '',
      description: transaction?.description ?? '',
      amount: transaction?.amount.toString() ?? '0',
      currency: getCurrencyKey(account?.currency) ?? '',
      type: getTransactionTypeKey(transaction?.type) ?? '',
      paymentMethod: getPaymentMethodKey(transaction?.paymentMethod) ?? '',
      date: transaction?.date ?? '',
      categoryId: transaction?.category.id.toString() ?? '',
      serviceId: transaction?.service.id.toString() ?? '',
      accountId: account?.id.toString() ?? '',
    },
    delayError: 100,
    mode: 'onChange',
  });

  useEffect(() => {
    if (transactionUpdated?.success) {
      navigate({
        from: '/transaction/edit/$transactionId',
        to: redirect === 'main' ? '/' : `/account/$accountId`,
        params: { accountId: transaction?.account.id.toString() },
        search: { method: 'edt' },
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transactionUpdated]);

  const onSubmit = async (data: FormSchema) => {
    await updateTransaction({
      id: transactionId,
      ...data,
      date: getOnlyDate(data.date),
      amount: moneyToNumber(data.amount),
      accountId: Number(data.accountId),
      categoryId: Number(data.categoryId),
      serviceId: Number(data.serviceId),
    });
  };

  return (
    <PageContainer>
      <FormContainer
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        title={t('edit_transaction')}
        description={t('edit_transaction_description')}
        buttonText={t('edit_transaction')}
      >
        <FormInput
          register={register}
          name="name"
          placeholder="Name"
          error={errors.name?.message}
        />

        <FormInput
          register={register}
          name="description"
          placeholder="Description"
          error={errors.description?.message}
        />

        <FormMoney
          register={register}
          currencyName="currency"
          amountName="amount"
          error={errors.amount?.message || errors.currency?.message}
          disabledCurrency
          onInput={handleMoneyInput}
          onBlur={handleMoneyInput}
        />

        <FormSelect
          register={register}
          name="type"
          placeholder="Select Transaction Type"
          error={errors.type?.message}
          options={Object.values(TransactionTypeKey).map((type) => ({
            value: type,
            label: t(TransactionType[type]),
          }))}
        />

        <FormSelect
          register={register}
          name="paymentMethod"
          placeholder="Select Payment Method"
          error={errors.paymentMethod?.message}
          options={Object.values(PaymentMethodKey).map((method) => ({
            value: method,
            label: t(PaymentMethod[method]),
          }))}
        />

        <FormSelect
          register={register}
          name="categoryId"
          placeholder="Select Category"
          error={errors.categoryId?.message}
          options={(transactionCategories || []).map((category) => ({
            value: category.id.toString(),
            label: t(category.name),
          }))}
        />

        <FormSelect
          register={register}
          name="serviceId"
          placeholder="Select Service"
          error={errors.serviceId?.message}
          options={(transactionServices || []).map((service) => ({
            value: service.id.toString(),
            label: t(service.name),
          }))}
        />

        <FormDate
          control={control}
          name="date"
          error={errors.date?.message}
          disableNavigation
          {...(isSameMonthAndYear ? {} : { defaultMonth: account?.date })}
        />
      </FormContainer>
    </PageContainer>
  );
};
