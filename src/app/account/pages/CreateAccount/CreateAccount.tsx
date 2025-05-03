import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from '@tanstack/react-router';
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
import { CurrencyKey } from '@/domain/currency.enum';
import { handleMoneyInput, moneyToNumber } from '@/utils/money-format.util';

import { Month, MonthKey } from '../../domain/month.enum';
import { useCreateAccountMutation } from '../../queries/account.query';

const formSchema = z.object({
  description: z.string().optional(),
  month: commonValidators.month,
  year: commonValidators.year,
  currency: commonValidators.currency,
  amount: commonValidators.money,
});
type FormData = z.infer<typeof formSchema>;

export const CreateAccount: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { data: accountCreated, mutateAsync: createAccount } =
    useCreateAccountMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      month: MonthKey.JANUARY,
      year: new Date().getFullYear().toString(),
      currency: CurrencyKey.PEN,
      amount: '0',
    },
    delayError: 100,
    mode: 'onChange',
  });

  useEffect(() => {
    if (accountCreated?.id) {
      navigate({
        to: '/account/$accountId',
        replace: true,
        params: { accountId: accountCreated.id },
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountCreated]);

  const onSubmit = async (data: FormData) => {
    await createAccount({
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
        title={t('create_account')}
        description={t('create_account_description')}
        buttonText={t('create_account')}
      >
        <FormSelect
          register={register}
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

        <FormInput
          register={register}
          name="description"
          placeholder={t('description')}
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
