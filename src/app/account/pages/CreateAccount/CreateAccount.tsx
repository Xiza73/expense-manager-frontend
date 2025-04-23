import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
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

  const { mutateAsync: createAccount } = useCreateAccountMutation({
    onSuccess: () => {
      navigate({ to: '/' });
    },
  });

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
            Create Account
          </Text>
          <Text
            as="p"
            className="text-center"
          >
            Fill the form below to create a new account
          </Text>

          <FormSelect
            register={register}
            name="month"
            placeholder="Month"
            error={errors.month?.message}
            options={Object.values(MonthKey).map((month) => ({
              value: month,
              label: Month[month],
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
        </div>
        <div className="flex justify-center w-full p-4 mt-2 bg-gray-100">
          <button
            type="submit"
            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            Create Account
          </button>
        </div>
      </form>
    </PageContainer>
  );
};
