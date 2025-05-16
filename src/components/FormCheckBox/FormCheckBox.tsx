import { CheckboxProps } from '@radix-ui/react-checkbox';
import { ForwardRefExoticComponent, RefAttributes } from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Checkbox } from '../ui/checkbox';

export interface FormCheckBoxProps<TFieldValues extends FieldValues>
  extends React.ComponentProps<
    ForwardRefExoticComponent<CheckboxProps & RefAttributes<HTMLButtonElement>>
  > {
  error?: string;
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  label: string;
}

export const FormCheckBox = <TFieldValues extends FieldValues>({
  control,
  name,
  error,
  id,
  label,
  ...props
}: FormCheckBoxProps<TFieldValues>) => {
  const { t } = useTranslation();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value: checked } }) => (
        <div className="flex flex-col w-full mb-4">
          <div className="flex items-center space-x-2 cursor-pointer">
            <Checkbox
              id={id}
              checked={checked}
              onCheckedChange={onChange}
              className="cursor-pointer"
              {...props}
            />
            <label
              htmlFor={id}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
            >
              {label}
            </label>
          </div>
          {error && <span className="text-red-500 text-sm">* {t(error)}</span>}
        </div>
      )}
    />
  );
};
