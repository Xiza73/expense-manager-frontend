import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

import { InputPassword, InputPasswordProps } from '../ui/input-password';

export interface ZodInputPasswordProps<TFieldValues extends FieldValues>
  extends InputPasswordProps {
  register: UseFormRegister<TFieldValues>;
  name: Path<TFieldValues>;
}

export const ZodInputPassword = <TFieldValues extends FieldValues>({
  register,
  name,
  ...props
}: ZodInputPasswordProps<TFieldValues>) => {
  return (
    <>
      <InputPassword
        {...props}
        {...register(name)}
        onChange={(e) => {
          register(name).onChange(e);
        }}
      />
    </>
  );
};
