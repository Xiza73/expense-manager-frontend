import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

import FormCheckBox from '@/components/FormCheckBox';
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
  isMonthly: z.boolean().default(true),
  description: z.string().optional(),
  month: commonValidators.month.optional(),
  year: commonValidators.year.optional(),
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
    control,
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      isMonthly: true,
      month: MonthKey.JANUARY,
      year: new Date().getFullYear().toString(),
      currency: CurrencyKey.PEN,
      amount: '0',
    },
    delayError: 100,
    mode: 'onChange',
  });

  const isMonthly = watch('isMonthly');

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
    const dateData: {
      month?: MonthKey;
      year?: number;
    } = {
      month: undefined,
      year: undefined,
    };

    if (data.isMonthly) {
      dateData.month = data.month;
      dateData.year = Number(data.year);
    }

    await createAccount({
      ...data,
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
        title={t('create_account')}
        description={t('create_account_description')}
        buttonText={t('create_account')}
      >
        <FormInput
          register={register}
          name="description"
          placeholder={isMonthly ? t('description') : t('account_name')}
          error={errors.description?.message}
        />

        <FormCheckBox
          id="isMonthly"
          control={control}
          name="isMonthly"
          label={t('is_monthly')}
          error={errors.isMonthly?.message}
        />

        {isMonthly && (
          <>
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
