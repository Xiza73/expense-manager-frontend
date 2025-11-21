import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

import { usePayDebtLoanTransactionMutation } from '@/app/transaction/queries/transaction.query';
import { FormAmount } from '@/components/FormAmount/FormAmount';
import FormCheckBox from '@/components/FormCheckBox';
import FormContainer from '@/components/FormContainer';
import FormInput from '@/components/FormInput';
import { commonValidators } from '@/contants/common-validators.constant';
import { Currency } from '@/domain/currency.enum';
import { handleMoneyInput, moneyToNumber } from '@/utils/money-format.util';

const formSchema = z.object({
  isPartial: z.boolean().default(false),
  description: z.string().optional(),
  amount: commonValidators.optionalMoney,
});
type FormData = z.infer<typeof formSchema>;

export interface PartialPaymentModalProps {
  id: string;
  title: string;
  currency: Currency;
  transactionDescription: string;
  closeModal: () => void;
}

export const PartialPaymentModal: React.FC<PartialPaymentModalProps> = ({
  id,
  title,
  currency,
  transactionDescription,
  closeModal,
}) => {
  const { t } = useTranslation();

  const { mutateAsync: payDebtLoanTransaction } =
    usePayDebtLoanTransactionMutation();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      isPartial: false,
      description: transactionDescription,
      amount: '0',
    },
    delayError: 100,
    mode: 'onChange',
  });

  const isPartial = watch('isPartial');

  const onSubmit = async (data: FormData) => {
    const res = await payDebtLoanTransaction({
      id,
      amount: data.isPartial ? moneyToNumber(data.amount) : 0,
      isPartial: data.isPartial,
      description: data.description,
    });

    if (res.success) closeModal();
  };

  return (
    <FormContainer
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      title={t(title)}
      description={t('pay_debt_loan_description')}
      buttonText={t('pay')}
      withoutButtonBackground
      cancelText={t('cancel')}
      cancelAction={closeModal}
      isModal
    >
      <div className="px-4 flex flex-col justify-center items-center w-full h-full">
        <FormCheckBox
          id="isPartial"
          control={control}
          name="isPartial"
          label={t('is_partial')}
          error={errors.isPartial?.message}
        />

        {isPartial && (
          <FormAmount
            register={register}
            currency={currency}
            amountName="amount"
            error={errors.amount?.message}
            onInput={handleMoneyInput}
            onBlur={handleMoneyInput}
          />
        )}

        <FormInput
          register={register}
          name="description"
          placeholder={t('description')}
          error={errors.description?.message}
          helperoText={t('pay_transaction_description_helper')}
        />
      </div>
    </FormContainer>
  );
};
