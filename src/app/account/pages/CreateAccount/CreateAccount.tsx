import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

import FormInput from '@/components/FormInput';
import FormMoney from '@/components/FormMoney';
import FormSelect from '@/components/FormSelect';
import PageContainer from '@/components/PageContainer';
import { Text } from '@/components/ui/text';
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col items-center justify-center w-full h-full p-4 space-y-4">
          <Text
            as="h1"
            className="text-center"
          >
            {t('create_account')}
          </Text>
          <Text
            as="p"
            className="text-center"
          >
            {t('create_account_description')}
          </Text>

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
        </div>
        <div className="flex justify-center w-full p-4 mt-2 bg-gray-100">
          <button
            type="submit"
            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            {t('create_account')}
          </button>
        </div>
      </form>
    </PageContainer>
  );
};
