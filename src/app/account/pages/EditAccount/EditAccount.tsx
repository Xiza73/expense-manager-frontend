import { zodResolver } from '@hookform/resolvers/zod';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from '@tanstack/react-router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

import FormContainer from '@/components/FormContainer';
import FormInput from '@/components/FormInput';
import FormMoney from '@/components/FormMoney';
import FormSelect from '@/components/FormSelect';
import PageContainer from '@/components/PageContainer';
import { commonValidators } from '@/contants/common-validators.constant';
import { getCurrencyKey } from '@/domain/currency.enum';
import { handleMoneyInput, moneyToNumber } from '@/utils/money-format.util';

import { getMonthKey, Month, MonthKey } from '../../domain/month.enum';
import {
  getAccountQueryOptions,
  useEditAccountMutation,
} from '../../queries/account.query';

const formSchema = z.object({
  description: z.string().optional(),
  month: commonValidators.month,
  year: commonValidators.year,
  currency: commonValidators.currency,
  amount: commonValidators.money,
});
type FormData = z.infer<typeof formSchema>;

export const EditAccount: React.FC = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const { accountId } = useParams({
    from: '/account/edit/$accountId',
  });

  const { data: account } = useSuspenseQuery(getAccountQueryOptions(accountId));

  const { data: accountEdited, mutateAsync: editAccount } =
    useEditAccountMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: account?.description ?? '',
      month: getMonthKey(account?.month),
      year: account?.year.toString(),
      currency: getCurrencyKey(account?.currency),
      amount: account?.amount.toString(),
    },
    delayError: 100,
    mode: 'onChange',
  });

  useEffect(() => {
    if (accountEdited?.success) {
      navigate({
        to: '/account/$accountId',
        replace: true,
        params: { accountId },
        search: {
          method: 'edt',
        },
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountEdited]);

  const onSubmit = async (data: FormData) => {
    await editAccount({
      id: accountId,
      ...data,
      amount: moneyToNumber(data.amount),
      year: Number(data.year),
    });
  };

  return (
    <PageContainer>
      <FormContainer
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        title={t('edit_account')}
        description={t('edit_account_description')}
        buttonText={t('edit_account')}
      >
        <FormSelect
          register={register}
          name="month"
          placeholder="Month"
          error={errors.month?.message}
          options={Object.values(MonthKey).map((month) => ({
            value: month,
            label: t(Month[month]),
          }))}
        />

        <FormInput
          register={register}
          name="year"
          placeholder="Year"
          error={errors.year?.message}
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
          onInput={handleMoneyInput}
          onBlur={handleMoneyInput}
        />
      </FormContainer>
    </PageContainer>
  );
};
