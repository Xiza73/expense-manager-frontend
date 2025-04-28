import { zodResolver } from '@hookform/resolvers/zod';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useNavigate, useParams, useSearch } from '@tanstack/react-router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { getAccountQueryOptions } from '@/app/account/queries/account.query';
import FormDate from '@/components/FormDate';
import FormInput from '@/components/FormInput';
import FormMoney from '@/components/FormMoney';
import FormSelect from '@/components/FormSelect';
import PageContainer from '@/components/PageContainer';
import { Text } from '@/components/ui/text';
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
  serviceId: commonValidators.id('Service'),
  accountId: commonValidators.id('Account'),
});
type FormSchema = z.infer<typeof formSchema>;

export const CreateTransaction: React.FC = () => {
  const navigate = useNavigate();

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
    },
    delayError: 100,
    mode: 'onChange',
  });

  useEffect(() => {
    if (transactionCreated?.success) {
      navigate({
        from: '/transaction/create/$accountId',
        to: redirect === 'main' ? '/' : `/account/$accountId`,
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
      serviceId: Number(data.serviceId),
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
            Create Transaction
          </Text>
          <Text
            as="p"
            className="text-center"
          >
            Fill the form below to create a new transaction on{' '}
            <strong>
              {account?.month} - {account?.year}
            </strong>
          </Text>

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
            placeholder="Name"
            error={errors.name?.message}
          />

          <FormInput
            register={register}
            name="description"
            placeholder="Description"
            error={errors.description?.message}
          />

          <FormSelect
            register={register}
            name="type"
            placeholder="Select Transaction Type"
            error={errors.type?.message}
            options={Object.values(TransactionTypeKey).map((type) => ({
              value: type,
              label: TransactionType[type],
            }))}
          />

          <FormSelect
            register={register}
            name="paymentMethod"
            placeholder="Select Payment Method"
            error={errors.paymentMethod?.message}
            options={Object.values(PaymentMethodKey).map((method) => ({
              value: method,
              label: PaymentMethod[method],
            }))}
          />

          <FormSelect
            register={register}
            name="categoryId"
            placeholder="Select Category"
            error={errors.categoryId?.message}
            options={(transactionCategories || []).map((category) => ({
              value: category.id.toString(),
              label: category.name,
            }))}
          />

          <FormSelect
            register={register}
            name="serviceId"
            placeholder="Select Service"
            error={errors.serviceId?.message}
            options={(transactionServices || []).map((service) => ({
              value: service.id.toString(),
              label: service.name,
            }))}
          />

          <FormDate
            control={control}
            name="date"
            error={errors.date?.message}
            disableNavigation
            {...(isSameMonthAndYear ? {} : { defaultMonth: account?.date })}
          />
        </div>
        <div className="flex justify-center w-full p-4 mt-2 bg-gray-100">
          <button
            type="submit"
            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            Create Transaction
          </button>
        </div>
      </form>
    </PageContainer>
  );
};
