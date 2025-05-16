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
  month: commonValidators.month.optional(),
  year: commonValidators.year.optional(),
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
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: account?.description ?? '',
      month: account?.month ? getMonthKey(account?.month) : MonthKey.JANUARY,
      year: account?.year
        ? account?.year.toString()
        : new Date().getFullYear().toString(),
      currency: getCurrencyKey(account?.currency),
      amount: account?.amount.toString(),
    },
    delayError: 100,
    mode: 'onChange',
  });

  const isMonthly = account?.isMonthly;

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
    const dateData: {
      month?: MonthKey;
      year?: number;
    } = {
      month: undefined,
      year: undefined,
    };

    if (isMonthly) {
      dateData.month = data.month;
      dateData.year = Number(data.year);
    }

    await editAccount({
      id: accountId,
      ...data,
      isMonthly,
      amount: moneyToNumber(data.amount),
      month: dateData.month,
      year: dateData.year,
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
        <FormInput
          register={register}
          name="description"
          placeholder={isMonthly ? t('description') : t('account_name')}
          error={errors.description?.message}
        />

        {isMonthly && (
          <>
            <FormSelect
              control={control}
              name="month"
              placeholder={t('select_month')}
              error={errors.month?.message}
              options={Object.values(MonthKey).map((month) => ({
                value: month,
                label: t(Month[month]),
              }))}
            />

            <FormInput
              register={register}
              name="year"
              placeholder={t('year')}
              error={errors.year?.message}
            />
          </>
        )}

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
