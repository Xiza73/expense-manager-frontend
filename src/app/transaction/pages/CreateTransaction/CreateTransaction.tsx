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
import { PaymentMethod, PaymentMethodKey } from '@/domain/payment-method.enum';
import { getOnlyDate } from '@/utils/date.util';
import { handleMoneyInput, moneyToNumber } from '@/utils/money-format.util';

import {
  TransactionType,
  TransactionTypeKey,
} from '../../domain/transaction-type.enum';
import { useCreateTransactionMutation } from '../../queries/transaction.query';
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
  serviceId: commonValidators.optionalId('Service'),
  accountId: commonValidators.id('Account'),
});
type FormSchema = z.infer<typeof formSchema>;

export const CreateTransaction: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { accountId } = useParams({ from: '/transaction/create/$accountId' });
  const { redirect } = useSearch({ from: '/transaction/create/$accountId' });

  const { data: account } = useSuspenseQuery(getAccountQueryOptions(accountId));
  const { data: transactionCreated, mutateAsync: createTransaction } =
    useCreateTransactionMutation();
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
      accountId: account?.id.toString(),
      categoryId: '',
      serviceId: '',
      date: isSameMonthAndYear ? new Date() : account?.date,
      currency: getCurrencyKey(account?.currency),
      type: TransactionTypeKey.EXPENSE,
      paymentMethod: PaymentMethodKey.CASH,
    },
    delayError: 100,
    mode: 'onChange',
  });

  useEffect(() => {
    if (transactionCreated?.success) {
      navigate({
        from: '/transaction/create/$accountId',
        to: redirect === 'main' ? '/expense-manager' : `/account/$accountId`,
        params: { accountId },
        search: { method: 'crt' },
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transactionCreated]);

  const onSubmit = async (data: FormSchema) => {
    await createTransaction({
      ...data,
      date: getOnlyDate(data.date),
      amount: moneyToNumber(data.amount),
      accountId: Number(data.accountId),
      categoryId: Number(data.categoryId),
      serviceId: data.serviceId ? Number(data.serviceId) : undefined,
    });
  };

  return (
    <PageContainer>
      <FormContainer
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        title={t('create_transaction')}
        description={t('create_transaction_description')}
        buttonText={t('create_transaction')}
      >
        <FormMoney
          register={register}
          currencyName="currency"
          amountName="amount"
          error={errors.amount?.message || errors.currency?.message}
          disabledCurrency
          onInput={handleMoneyInput}
          onBlur={handleMoneyInput}
        />

        <FormInput
          register={register}
          name="name"
          placeholder={t('name')}
          error={errors.name?.message}
        />

        <FormInput
          register={register}
          name="description"
          placeholder={t('description')}
          error={errors.description?.message}
        />

        <FormSelect
          control={control}
          name="type"
          error={errors.type?.message}
          options={Object.values(TransactionTypeKey).map((type) => ({
            value: type,
            label: t(TransactionType[type]),
          }))}
        />

        <FormSelect
          control={control}
          name="paymentMethod"
          error={errors.paymentMethod?.message}
          options={Object.values(PaymentMethodKey).map((method) => ({
            value: method,
            label: t(PaymentMethod[method]),
          }))}
        />

        <FormSelect
          control={control}
          name="categoryId"
          placeholder={t('select_category')}
          error={errors.categoryId?.message}
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

        <FormDate
          control={control}
          name="date"
          error={errors.date?.message}
          disableNavigation={account?.isMonthly}
          {...(isSameMonthAndYear ? {} : { defaultMonth: account?.date })}
        />
      </FormContainer>
    </PageContainer>
  );
};
